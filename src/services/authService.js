import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { sendEmail, verifyEmail } from './emailService'

const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email })
  if (existingUser) {
    throw new ApiError(StatusCodes.CONFLICT, 'Email đã tồi tại, vui lòng thử lại!!')
  }

  setTimeout(async () => {
    await sendEmail({ receiverEmail: userData?.email, userName: userData?.fullName })
  }, 20000)

  const user = await User.create(userData)

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName
  }
}

// xử lý đăng nhập bằng social
/*
- Lần đăng nhập đầu tiên, vào db tạo dữ liệu cho người dùng lấy các thông tin, userName, userEmail
- Trả về thông tin để người dùng đăng nhâp
- Từ những lần đăng nhập sau kiểm tra email và provider xem có đúng giá trị không nếu có thi logic
- Nếu mà lỗi thì không logic
*/

const loginSocial = async (userData) => {
  try {
    const findUser = await User.findOne({ email: userData.email })

    if (findUser) {
      if (findUser.provider === userData.provider) {
        // Người dùng đã đăng nhập trước đó bằng cùng một provider
        return findUser
      } else {
        // Người dùng đã đăng nhập trước đó bằng một provider khác
        // Xử lý lỗi tại đây (ví dụ: không cho phép đăng nhập bằng nhiều provider khác nhau)
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Email này đã tồn tại ở tài khoản khác, vui lòng kiểm tra lại.')
      }
    } else {
      // Tài khoản chưa tồn tại - tạo mới tài khoản
      const newUser = await User.create(userData)

      if (newUser) {
        // Trả về thông tin để người dùng đăng nhập
        return newUser
      } else {
        // Xử lý lỗi tạo mới tài khoản
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Đăng nhập không thành công vui lòng thử lại.')
      }
    }
  } catch (error) {
    throw new ApiError(StatusCodes.BAD_REQUEST, error.message)
  }
}

const updateRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(userId, { refreshToken }, { new: true })
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Tài khoản không tồn tại!!')
  }

  const isPasswordCorrect = await user.isPasswordMatch(password)
  if (!isPasswordCorrect) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Mật khẩu không đúng!!')
  }

  if (user.isBlocked) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Tài khoản của bạn đã bị khóa')
  }

  return user
}

const loginAdmin = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or pssword')
  }

  if (user.role !== 'admin') {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not an admin')
  }

  return user
}

const getProfile = async (userId) => {
  return await User.findById(userId).select('-password -refreshToken')
}

const updateProfile = async (userId, userData) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      fullName: userData?.fullName,
      phoneNumber: userData?.phoneNumber,
      gender: userData?.gender,
      avatar: userData?.avatar
    },
    { new: true }
  )
}

const verifyRefreshToken = async (refreshToken) => {
  try {
    const user = await User.findOne({ refreshToken }) // Tìm người dùng bằng refreshToken
    if (!user) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'User not found')
    }

    return user
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const getAllUsers = async () => {
  return await User.find({ role: 'user', isBlocked: false }).select('-password')
}

const getUserByEmail = async (userEmail) => {
  return await User.findOne({ email: userEmail, role: 'user', isBlocked: false }).select('-password')
}

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId)
}

const getUsersAdmin = async () => {
  return await User.find({ role: 'admin' }).select('-password')
}

const logout = async (userId) => {
  try {
    return User.findOneAndUpdate({ _id: userId }, { refreshToken: '' })
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const getUserByid = async (userId) => {
  return User.findById(userId).select('-password')
}

const blockUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
}

const unBlockUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
}

const updateAddress = async (userId, addressData) => {
  return await User.findByIdAndUpdate(userId, { $push: { addresses: addressData } }, { new: true })
}

// Hàm phụ để đặt lại tất cả `isDefault` thành `false`
async function resetIsDefault(userId) {
  await User.updateOne({ _id: userId }, { $set: { 'addresses.$[].isDefault': false } })
}

const changeAddressDefault = async (userId, addressId) => {
  // Đặt lại tất cả `isDefault` thành `false`
  await resetIsDefault(userId)

  // Cập nhật địa chỉ được chọn thành `true`
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: { 'addresses.$[elem].isDefault': true }
    },
    {
      arrayFilters: [{ 'elem._id': addressId }],
      new: true
    }
  )
}

const updateNewAddress = async (userId, addressId, addressData) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { 'addresses.$[elem]': addressData } },
    { arrayFilters: [{ 'elem._id': addressId }], new: true }
  )
}

const deleteAddress = async (userId, addressId) => {
  return await User.findByIdAndUpdate(userId, { $pull: { addresses: { _id: addressId } } }, { new: true })
}

const addProductFavorite = async (userId, productId) => {
  return await User.findByIdAndUpdate(userId, { $addToSet: { favoriteProducts: productId } }, { new: true })
}

const deleteProductFavorite = async (userId, productId) => {
  return await User.findByIdAndUpdate(userId, { $pull: { favoriteProducts: productId } }, { new: true })
}

const getProductFavoriteByUser = async (userId) => {
  // Trong hàm getProductFavoriteByUser
  const user = await User.findById(userId).populate('favoriteProducts')
  if (!user || !user.favoriteProducts) {
    return [] // Hoặc trả về một giá trị phù hợp nếu không có sản phẩm yêu thích
  }
  return user.favoriteProducts
}

// veryfy email
const sendEmailCode = async (id, verifyCode, expiryDate) => {
  const user = await User.findById(id)

  if (!user) {
    throw new ApiError(StatusCodes.CONFLICT, 'Người dùng không tồn tại, vui lòng thử lại!')
  }

  if (user.isVerified) {
    return { message: 'Người dùng đã được xác minh' }
  }

  user.emailVerificationCode = verifyCode
  user.emailVerificationDate = expiryDate
  await user.save()

  await verifyEmail({
    receiverEmail: user.email,
    userName: user.fullName,
    verificationCode: verifyCode
  })
}

const verifyEmailCode = async (userId, emailCode) => {
  const user = await User.findById(userId)
  if (user.emailVerificationCode === emailCode && user.emailVerificationDate > new Date()) {
    user.emailVerified = true
    user.emailVerificationCode = null
    user.emailVerificationDate = null
    await user.save()
    return { message: 'Xác minh email thành công' }
  }
}

// grantAdminPermissionByEmail
const grantAdminPermissionByEmail = async (userEmail) => {
  return await User.findOneAndUpdate({ email: userEmail }, { role: 'admin' }, { new: true })
}

export const authService = {
  createUser,
  loginUser,
  loginSocial,
  verifyRefreshToken,
  getAllUsers,
  getUserByEmail,
  logout,
  getUserByid,
  blockUser,
  unBlockUser,
  getUsersAdmin,
  loginAdmin,
  deleteUserById,
  updateRefreshToken,
  getProfile,
  updateProfile,
  updateAddress,
  updateNewAddress,
  changeAddressDefault,
  deleteAddress,
  addProductFavorite,
  deleteProductFavorite,
  getProductFavoriteByUser,
  sendEmailCode,
  verifyEmailCode,
  grantAdminPermissionByEmail
}

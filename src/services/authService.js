import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import { sendEmail } from './emailService'

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
  return await User.find({ role: 'user' }).select('-password')
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

export const authService = {
  createUser,
  loginUser,
  verifyRefreshToken,
  getAllUsers,
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
  deleteAddress
}

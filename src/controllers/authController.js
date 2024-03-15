import { StatusCodes } from 'http-status-codes'
import { generateToken } from '~/config/jwtToken'
import { generateRefreshToken } from '~/config/refreshToken'
import { authService } from '~/services/authService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'
import { generateVerificationCode } from '~/utils/verificationCode'

const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body
    const user = await authService.createUser({ email, password, fullName })

    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.loginUser(email, password)
    const refreshToken = await generateRefreshToken(user?._id)
    const token = await generateToken(user?._id)
    await authService.updateRefreshToken(user?._id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7
    })

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      userAddress: user.addresses,
      emailVerified: user.emailVerified,
      token
    })
  } catch (error) {
    next(error)
  }
}

const loginSocial = async (req, res, next) => {
  try {
    const { email, fullName, providerId: provider } = req.body
    const user = await authService.loginSocial({ email, fullName, provider })
    const refreshToken = await generateRefreshToken(user?._id)
    const token = await generateToken(user?._id)
    await authService.updateRefreshToken(user?._id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7
    })

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      userAddress: user.addresses,
      emailVerified: user.emailVerified,
      token
    })
  } catch (error) {
    next(error)
  }
}

const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.loginAdmin(email, password)
    const refreshToken = await generateRefreshToken(user?._id)
    const token = await generateToken(user?._id)
    await authService.updateRefreshToken(user?._id, refreshToken)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7
    })

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userRole: user.role,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      token
    })
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const cookie = req.cookies
    if (!cookie.refreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'No refresh token in Cookies')
    const refreshToken = cookie.refreshToken
    const user = await authService.verifyRefreshToken(refreshToken)

    if (!user) {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
      return res.status(StatusCodes.FORBIDDEN)
    }
    await authService.logout(user._id)

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true
    })
    res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
  } catch (error) {
    next()
  }
}

const getProfile = async (req, res, next) => {
  try {
    const { _id } = req.user
    const user = await authService.getProfile(_id)

    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const user = await authService.updateProfile(_id, req.body)

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      new ApiError(StatusCodes.UNAUTHORIZED, 'No refresh token')
    }

    const user = await authService.verifyRefreshToken(refreshToken)
    if (!user) {
      new ApiError(StatusCodes.UNAUTHORIZED, 'No user')
    }

    const newRefreshToken = await generateRefreshToken(user._id)
    const token = await generateToken(user._id)

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 7
    })

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userRole: user.role,
      userAvatar: user.avatar,
      token,
      refreshToken: newRefreshToken
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getUsersAdmin = async (req, res, next) => {
  try {
    const users = await authService.getUsersAdmin()

    res.status(StatusCodes.OK).json({ users })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getUsers = async (req, res, next) => {
  try {
    const { email } = req.query
    let users
    if (email) {
      users = await authService.getUserByEmail(email)
    } else {
      users = await authService.getAllUsers()
    }

    res.status(StatusCodes.OK).json({ users })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const userDeleted = await authService.deleteUserById(id)

    res.status(StatusCodes.OK).json({ message: 'User deleted', userDeleted })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const user = await authService.getUserByid(id)

    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const userBlocked = await authService.blockUser(id)

    res.status(StatusCodes.OK).json({ meassage: 'User blocked', userBlocked })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const unBlockUser = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const userUnBlocked = await authService.unBlockUser(id)

    res.status(StatusCodes.OK).json({ message: 'User unblocked', userUnBlocked })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateAddress = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const addressData = req.body
    const user = await authService.updateAddress(_id, addressData)

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      userAddress: user.addresses
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteAddress = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { addressId } = req.params
    validateMongodbId(addressId)
    const user = await authService.deleteAddress(_id, addressId)

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      userAddress: user.addresses
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const changeAddressDefault = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { addressId } = req.params
    validateMongodbId(addressId)
    const user = await authService.changeAddressDefault(_id, addressId)

    res.status(StatusCodes.OK).json({
      id: user._id,
      userName: user.fullName,
      userEmail: user.email,
      userAvatar: user.avatar,
      userPhone: user.phoneNumber,
      userGender: user.gender,
      userAddress: user.addresses
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const addProductFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { productId } = req.params
    validateMongodbId(productId)
    const user = await authService.addProductFavorite(_id, productId)

    res.status(StatusCodes.OK).json({
      favoriteProducts: user.favoriteProducts
    })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteProductFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { productId } = req.params
    validateMongodbId(productId)
    const deletedProductFavorite = await authService.deleteProductFavorite(_id, productId)

    res.status(StatusCodes.OK).json({ deletedProductFavorite })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getProductFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const productsFavorite = await authService.getProductFavoriteByUser(_id)

    res.status(StatusCodes.OK).json({ productsFavorite })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const sendEmailCode = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { verificationCode, expiryDate } = generateVerificationCode()

    await authService.sendEmailCode(_id, verificationCode, expiryDate)

    res.status(StatusCodes.OK).json({ message: 'Mã xác minh đã được gửi đến email của bạn.' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Dữ liệu không hợp lệ'))
    } else if (error.message === 'Email không hợp lệ') {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Email không hợp lệ'))
    } else {
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Có lỗi xảy ra trên máy chủ'))
    }
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const { _id } = req.user
    validateMongodbId(_id)
    const { code } = req.body
    const user = await authService.verifyEmailCode(_id, code)

    if (!user) {
      return next(new ApiError(StatusCodes.BAD_REQUEST, 'Mã xác minh không hợp lệ'))
    }

    res.status(StatusCodes.OK).json({ message: 'Xác thực email thành công' })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

//grantAdminPermissionByEmail
const grantAdminPermissionByEmail = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Vui lòng nhập email' })
    }

    const user = await authService.getUserByEmail(email)
    if (user) {
      const updatedRole = await authService.grantAdminPermissionByEmail(email)
      return res.status(StatusCodes.OK).json({ message: 'Cập nhật thành công!', updatedRole })
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Email không tồn tại, vui lòng thử lại.' })
    }
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error from server, please try again'))
  }
}

export const authController = {
  register,
  login,
  loginSocial,
  loginAdmin,
  refreshToken,
  getUsersAdmin,
  getUsers,
  logoutUser,
  getUserById,
  blockUser,
  unBlockUser,
  deleteUserById,
  getProfile,
  updateProfile,
  updateAddress,
  deleteAddress,
  changeAddressDefault,
  addProductFavorite,
  deleteProductFavorite,
  getProductFavorite,
  sendEmailCode,
  verifyEmail,
  grantAdminPermissionByEmail
}

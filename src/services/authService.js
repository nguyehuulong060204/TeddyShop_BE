import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'
import ApiError from '~/utils/ApiError'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { sendEmail } from './emailService'

const createUser = async (userData) => {
  if (await User.isEmailTaken(userData.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken')
  }
  setTimeout(async () => {
    await sendEmail({ receiverEmail: userData?.email, userName: userData?.fullName })
  }, 20000)

  const userName = userData.email.split('@')[0]
  userData.fullName = userName
  return User.create(userData)
}

const loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or pssword')
  }

  if (user.isBlocked) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Your account has been blocked')
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

const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, env.REFRESH_JWT_SECRET)
    const user = await User.findOne({ _id: decoded.id })
    if (!user) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'User not found')
    }

    // check if the refresh token exist in the user's refreshtokens array
    const tokenExists = user.refreshTokens.some((tokenObj) => tokenObj.token === refreshToken)
    if (!tokenExists) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid refresh token')
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
    return User.findOneAndUpdate({ _id: userId }, { refreshTokens: [] })
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
  deleteUserById
}

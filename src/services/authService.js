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
  try {
    return await User.find()
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const logout = async (userId) => {
  try {
    return User.findOneAndUpdate({ _id: userId }, { refreshTokens: [] })
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const getUserByid = async (userId) => {
  try {
    return User.findById(userId)
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const blockUser = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

const unBlockUser = async (userId) => {
  try {
    return await User.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

export const authService = {
  createUser,
  loginUser,
  verifyRefreshToken,
  getAllUsers,
  logout,
  getUserByid,
  blockUser,
  unBlockUser
}

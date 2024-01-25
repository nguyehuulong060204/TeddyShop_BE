import jwt from 'jsonwebtoken'
import { env } from './environment'
import { ApiError } from '../utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/userModel'

const generateRefreshToken = async (id) => {
  try {
    const refreshToken = jwt.sign({ id }, env.REFRESH_JWT_SECRET, { expiresIn: '7d' })
    const user = await User.findById(id)
    user.refreshTokens.push({ token: refreshToken })
    await user.save()

    return refreshToken
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, error.message)
  }
}

export { generateRefreshToken }

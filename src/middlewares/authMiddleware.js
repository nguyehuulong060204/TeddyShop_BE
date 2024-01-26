import jwt from 'jsonwebtoken'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { authService } from '~/services/authService'

// kiểm tra người dùng đã đăng nhập hay chưa
const authMiddleware = async (req, res, next) => {
  let token
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    try {
      if (token) {
        const deconded = jwt.verify(token, env.JWT_SECRET)
        const user = await authService.getUserByid(deconded?.id)
        req.user = user

        next()
      }
    } catch (error) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized token expired, Please Login')
    }
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user
    if (user.role === 'admin') {
      next()
    } else {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not an Admin')
    }
  } catch (error) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized token expired, Please Login')
  }
}

export { authMiddleware, isAdmin }

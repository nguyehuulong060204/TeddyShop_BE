import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { authService } from '~/services/authService'
import ApiError from '~/utils/ApiError'

const authMiddleware = async (req, res, next) => {
  let token
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET)
      const user = await authService.getUserByid(decoded?.id)
      req.user = user
      next()
    } catch (error) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized token expired, Please Login again'))
    }
  } else {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized token expired, Please Login again'))
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user
    if (user.role === 'admin') {
      next()
    } else {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized as an admin'))
    }
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Not Authorized token expired, Please Login again'))
  }
}

export { authMiddleware, isAdmin }

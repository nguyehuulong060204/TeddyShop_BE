import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { authService } from '~/services/authService'

// kiểm tra người dùng đã đăng nhập hay chưa
const authMiddleware = async (req, res, next) => {
  let token
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    if (token) {
      const deconded = jwt.verify(token, env.JWT_SECRET)
      const user = await authService.getUserByid(deconded?.id)
      req.user = user

      next()
    } else {
      throw new Error('Not Authorized token expired, Please Login again')
    }
  } else {
    throw new Error('There is no token arrached to header')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = req.user
    if (user.role === 'admin') {
      next()
    } else {
      throw new Error('You are not an admin')
    }
  } catch (error) {
    throw new Error('Not Authorized token expired, Please Login again')
  }
}

export { authMiddleware, isAdmin }

import jwt from 'jsonwebtoken'
import { env } from './environment'

const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '1d' })
}

export { generateToken }

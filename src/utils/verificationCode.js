import crypto from 'crypto'

export const generateVerificationCode = () => {
  const bytes = crypto.randomBytes(3)
  const verificationCode = Math.floor(100000 + ((bytes[0] + bytes[1] + bytes[2]) % 900000))
  const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 24)

  return {
    verificationCode,
    expiryDate
  }
}

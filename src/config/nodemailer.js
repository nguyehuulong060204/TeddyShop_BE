import nodemailer from 'nodemailer'
import { env } from './environment'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.USER_EMAIL,
    pass: env.USER_PASSWORD
  }
})

export { transporter }

import express from 'express'
import { authController } from '~/controllers/authController'
import { authValidation } from '~/validations/authValidation'

const Router = express.Router()

Router.post('/register', authValidation.createUser, authController.register)
Router.post('/login', authValidation.loginUser, authController.login)
Router.post('/refreshToken', authController.refreshToken)
Router.get('/logout', authController.logoutUser)

// admin routes
Router.get('/', authController.getAllUsers)

export const authRouter = Router

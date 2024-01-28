import express from 'express'
import { memberController } from '~/controllers/memberController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { memberValidation } from '~/validations/memberValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, memberValidation.createMember, memberController.createMember)
Router.get('/', memberController.getAllMember)
Router.get('/:id', memberController.getMemberById)
Router.put('/:id', authMiddleware, memberValidation.updateMember, memberController.updateMember)
Router.delete('/:id', authMiddleware, isAdmin, memberController.deleteMember)

export const memberRouter = Router

import express from 'express'
import { feedbackController } from '~/controllers/feedbackController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { feedbackValidation } from '~/validations/feedbackValidation'

const Router = express.Router()

Router.post('/', authMiddleware, feedbackValidation.createFeedback, feedbackController.createFeedback)
Router.get('/', authMiddleware, isAdmin, feedbackController.getAllFeedBack)
Router.put(
  '/:id',
  authMiddleware,
  isAdmin,
  feedbackValidation.updateFeedbackStatus,
  feedbackController.updateFeedbackStatus
)

export const feedbackRouter = Router

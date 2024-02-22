import express from 'express'
import { scheduleController } from '~/controllers/scheduleController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { scheduleValidation } from '~/validations/scheduleValidation'

const Router = express.Router()

Router.post('/', authMiddleware, isAdmin, scheduleValidation.createSchedule, scheduleController.createSchedule)
Router.get('/', scheduleController.getAllSchedule)
Router.get('/:id', scheduleController.getScheduleById)
Router.put('/:id', authMiddleware, scheduleValidation.createSchedule, scheduleController.createSchedule)
Router.delete('/:id', authMiddleware, isAdmin, scheduleController.deleteScheduleById)

export const scheduleRouter = Router

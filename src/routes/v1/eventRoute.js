import express from 'express'
import { eventController } from '~/controllers/eventController'
import { authMiddleware, isAdmin } from '~/middlewares/authMiddleware'
import { eventValidation } from '~/validations/eventValidation'

const Router = express.Router()

Router.get('/getByDateRange', eventValidation.getEventByDateRange, eventController.getByDateRange)
Router.post('/', authMiddleware, isAdmin, eventValidation.createEvent, eventController.createEvent)
Router.get('/', eventController.getAllEvent)
Router.get('/:id', eventController.getEventById)
Router.put('/:id', authMiddleware, isAdmin, eventValidation.updateEvent, eventController.updateEvent)
Router.delete('/:id', authMiddleware, isAdmin, eventController.deleteEventById)

export const eventRouter = Router

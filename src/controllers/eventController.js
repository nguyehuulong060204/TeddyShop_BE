import { StatusCodes } from 'http-status-codes'
import { eventService } from '~/services/eventService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body)

    res.status(StatusCodes.OK).json({ event })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllEvent = async (req, res, next) => {
  try {
    let events
    const { name, location } = req.query
    if (name && location) {
      events = await eventService.getEventByNameAndLocation(name, location)
    } else if (name) {
      events = await eventService.getEventByName(name)
    } else if (location) {
      events = await eventService.getEventByLocation(location)
    } else {
      events = await eventService.getAllEvent()
    }

    res.status(StatusCodes.OK).json({ events })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const event = await eventService.getEventById(id)

    res.status(StatusCodes.OK).json({ event })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query
    const events = await eventService.getEventsByDateRange(startDate, endDate)

    res.status(StatusCodes.OK).json({ events })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updateEvent = await eventService.updateEvent(id, req.body)

    res.status(StatusCodes.OK).json({ updateEvent })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedEvent = await eventService.deleteEvent(id)

    res.status(StatusCodes.OK).json({ message: 'Deleted Successfully', deletedEvent })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const eventController = {
  createEvent,
  getAllEvent,
  getEventById,
  updateEvent,
  getByDateRange,
  deleteEventById
}

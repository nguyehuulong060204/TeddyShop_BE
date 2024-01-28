import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'
import { scheduleService } from '~/services/scheduleService'

const createSchedule = async (req, res, next) => {
  try {
    const schedule = await scheduleService.createSchedule(req.body)

    res.status(StatusCodes.OK).json({ schedule })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error from server, please try again'))
  }
}

const getScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params
    const schedule = await scheduleService.getScheduleById(id)

    res.status(StatusCodes.OK).json({ schedule })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getScheduleByEvent = async (req, res, next) => {
  try {
    const { event } = req.query
    validateMongodbId(event)
    const schedules = await scheduleService.getAllScheduleByEvent(event)

    res.status(StatusCodes.OK).json({ schedules })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedbrand = await scheduleService.updateSchedule(id, req.body)

    res.status(StatusCodes.OK).json({ updatedbrand })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedSchedule = await scheduleService.deleteSchedule(id)

    res.status(StatusCodes.OK).json({ message: 'Deleted Successfully', deletedSchedule })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const scheduleController = {
  createSchedule,
  getScheduleByEvent,
  getScheduleById,
  updateSchedule,
  deleteScheduleById
}

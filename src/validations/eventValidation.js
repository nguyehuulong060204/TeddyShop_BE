import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createEvent = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    time: Joi.date().required(),
    location: Joi.string().required().trim(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    schedules: Joi.string().required().optional,
    members: Joi.array().items(Joi.string())
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid event data'))
    })
}

const updateEvent = async (req, rex, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    time: Joi.date().required(),
    location: Joi.string().required().trim(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    schedules: Joi.string().required().optional,
    members: Joi.array().items(Joi.string())
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid event data'))
    })
}

const getEventByName = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid event data'))
    })
}

const getEventByDateRange = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  })

  await conrrectCondition
    .validateAsync(req.query, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid event data'))
    })
}

const getEventByLocation = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    location: Joi.string().required().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid event data'))
    })
}

export const eventValidation = {
  createEvent,
  updateEvent,
  getEventByName,
  getEventByDateRange,
  getEventByLocation
}

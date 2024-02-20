import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createMember = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(8).trim(),
    position: Joi.string().required().trim(),
    description: Joi.string().trim(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    socialMedia: Joi.object({
      facebook: Joi.string().allow(''),
      twitter: Joi.string().allow(''),
      instagram: Joi.string().allow(''),
      zalo: Joi.string().allow('')
    }).allow(null),
    images: Joi.object({
      public_id: Joi.string().optional(),
      url: Joi.string().optional()
    }).optional(),
    startWorkingDate: Joi.date().required()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid member data', error))
  }
}

const updateMember = async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().required().min(8).trim(),
    position: Joi.string().required().trim(),
    description: Joi.string().trim(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    socialMedia: Joi.object({
      facebook: Joi.string().allow(''),
      twitter: Joi.string().allow(''),
      instagram: Joi.string().allow(''),
      zalo: Joi.string().allow('')
    }).allow(null),
    images: Joi.object({
      public_id: Joi.string().optional(),
      url: Joi.string().optional()
    }).optional(),
    startWorkingDate: Joi.date().required(),
    endWorkingDate: Joi.date().optional()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid member data', error))
  }
}

export const memberValidation = {
  createMember,
  updateMember
}

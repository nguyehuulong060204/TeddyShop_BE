import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createMember = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    fullName: Joi.string().required().min(8).trim(),
    position: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.object({
      public_id: Joi.string(),
      url: Joi.string
    }).optional()
    // links: Joi.array()
    //   .items(
    //     Joi.object({
    //       name: Joi.string(),
    //       url: Joi.string()
    //     })
    //   )
    //   .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid member data'))
    })
}

const updateMember = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    fullName: Joi.string().required().min(8).trim(),
    position: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.object({
      public_id: Joi.string(),
      url: Joi.string
    }).optional(),
    links: Joi.array()
      .items(
        Joi.object({
          name: Joi.string(),
          url: Joi.string()
        })
      )
      .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid member data'))
    })
}

export const memberValidation = {
  createMember,
  updateMember
}

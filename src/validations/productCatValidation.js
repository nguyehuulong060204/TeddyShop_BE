import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createProCat = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isActive: Joi.boolean().default(true)
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), 'Invalid Product Category Data')
    })
}

const updateProCat = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isActive: Joi.boolean().default(true)
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), 'Invalid Product Category Data')
    })
}

export const productCategoryValidation = {
  createProCat,
  updateProCat
}

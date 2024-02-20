import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createBrand = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim(),
    logo: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    }).optional(),
    thumbnail: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    }).optional(),
    productCategory: Joi.array().items(Joi.string()),
    isActive: Joi.boolean().default(true)
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid brand data'))
    })
}

const updateBrand = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim(),
    logo: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    }),
    productCategory: Joi.string().required().trim(),
    isActive: Joi.boolean().default(true)
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid brand data'))
    })
}

export const brandValidation = {
  createBrand,
  updateBrand
}

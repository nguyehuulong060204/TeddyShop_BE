import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createProCat = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    tags: Joi.array().items(Joi.string().trim()).optional(),
    slogan: Joi.string().trim().optional()
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
    tags: Joi.array().items(Joi.string().trim()).optional(),
    slogan: Joi.string().trim().optional()
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

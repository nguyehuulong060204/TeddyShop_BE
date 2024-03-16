import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const addToCart = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    productId: Joi.string().required().trim(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    option: Joi.object({
      name: Joi.string().allow(''),
      code: Joi.string().allow('')
    }).optional(),
    color: Joi.object({
      name: Joi.string().allow(''),
      code: Joi.string().allow('')
    }).optional(),
    switch: Joi.object({
      name: Joi.string().allow(''),
      code: Joi.string().allow('')
    }).optional(),
    attributeId: Joi.string().allow('')
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch((error) => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Validation Error', error))
    })
}

export const cartValidation = {
  addToCart
}

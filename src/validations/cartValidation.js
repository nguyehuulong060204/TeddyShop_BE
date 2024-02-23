import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const addToCart = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    productId: Joi.string().required().trim(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    type: Joi.string().trim().optional(),
    color: Joi.string().trim().optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid cart data'))
    })
}

export const cartValidation = {
  addToCart
}

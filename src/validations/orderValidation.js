import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createOrder = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    shippingInfo: Joi.object({
      fullName: Joi.string().required().trim(),
      address: Joi.string().required().trim(),
      city: Joi.string().required().trim(),
      phoneNumber: Joi.string().required().trim(),
      other: Joi.optional()
    }),
    user: Joi.string().required().trim(),
    orderItems: Joi.array()
      .items(
        Joi.object({
          product: Joi.string().required().trim(),
          color: Joi.string().required().trim(),
          type: Joi.string().required().trim(),
          quantity: Joi.number().required(),
          price: Joi.number().required()
        })
      )
      .required(),
    orderDate: Joi.date().required(),
    totalPrice: Joi.number().required(),
    orderStatus: Joi.string().required().trim(),
    paymentMethod: Joi.string().required().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid order data'))
    })
}

const updateOrder = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    shippingInfo: Joi.object({
      fullName: Joi.string().trim(),
      address: Joi.string().trim(),
      city: Joi.string().trim(),
      phoneNumber: Joi.string().trim(),
      other: Joi.optional()
    }),
    user: Joi.string().trim(),
    orderItems: Joi.array().items(
      Joi.object({
        product: Joi.string().trim(),
        color: Joi.string().trim(),
        type: Joi.string().trim(),
        quantity: Joi.number(),
        price: Joi.number()
      })
    ),
    orderDate: Joi.date(),
    totalPrice: Joi.number(),
    orderStatus: Joi.string().trim(),
    paymentMethod: Joi.string().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid order data'))
    })
}

const updateOrderStatus = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    status: Joi.string().required().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid order status'))
    })
}

export const orderValidation = {
  createOrder,
  updateOrder,
  updateOrderStatus
}

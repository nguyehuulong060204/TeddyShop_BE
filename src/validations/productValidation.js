import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createProduct = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    priceSale: Joi.number().optional(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    warranty: Joi.string().required().trim(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    createdBy: Joi.string().required(),
    options: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim()
        })
      )
      .optional(),
    colors: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim()
        })
      )
      .optional(),
    types: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim()
        })
      )
      .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid product data'))
    })
}

const updateProduct = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    priceSale: Joi.number().optional(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    warranty: Joi.string().required().trim(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string(),
          _id: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    options: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim(),
          _id: Joi.string()
        })
      )
      .optional(),
    colors: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim(),
          _id: Joi.string()
        })
      )
      .optional(),
    types: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim(),
          code: Joi.string().trim(),
          _id: Joi.string()
        })
      )
      .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid product data'))
    })
}

const updateQuantity = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    productId: Joi.string().required().trim(),
    quantityPurchased: Joi.number().required()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid product data'))
    })
}

const updateProductPrice = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    option: Joi.object({
      code: Joi.string().trim()
    })
      .optional()
      .allow(''),
    color: Joi.object({
      code: Joi.string().trim()
    })
      .optional()
      .allow(''),
    switch: Joi.object({
      code: Joi.string().trim()
    })
      .optional()
      .allow('')
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid product data'))
    })
}

/*
  productQuantity: tổng số sản phẩm đang có
  quantity: số lượng sản phẩm mới
  product.quantity: số lượng sản phẩm cha
  productAvaible: số lượng sản phẩm trống
  - Các trường hợp có thể xảy ra:
    + quantity + productQuantity > product.quantity: báo lỗi
    + quantity > product.quantity: báo lỗi
    + quantity > available: báo lỗi
    + quantity + productQuantity <= product.quantity: validate dữ liệu
    + quantity + productQuantity <= productAvaible: validate dữ liệu
    + quantiy + productQuantity = productAvaible: validate dữ liệu
  */
export const productValidation = {
  createProduct,
  updateProduct,
  updateQuantity,
  updateProductPrice
}

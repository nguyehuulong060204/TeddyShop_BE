import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'

import ApiError from '~/utils/ApiError'

const createProduct = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    priceOld: Joi.number().optional(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    warranty: Joi.string().required().trim(),
    brand: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    createdBy: Joi.string().required().trim(),
    status: Joi.string().valid('active', 'inactive').default('active')
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
    priceOld: Joi.number().optional(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    warranty: Joi.string().required().trim(),
    brand: Joi.string().required().trim(),
    category: Joi.string().required().trim(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid('active', 'inactive').default('active')
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid product data'))
    })
}

const getProductByPriceRange = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    minPrice: Joi.number().required(),
    maxPrice: Joi.number().required()
  })

  await conrrectCondition
    .validateAsync(req.query, { abortEarly: false })
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

const addPriceToProduct = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().required().trim(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    color: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional(),
    type: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional(),
    size: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional()
  })

  // kiểm tra xem số lượng từng sản phẩm có vượt quá số lượng sản phẩm cha hay không
  const { productId, quantity } = req.body
  const productQuantity = await productService.getTotalProductByProductId(productId)
  const product = await productService.getProductById(productId)
  const productAvaible = product.quantity - productQuantity

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

  if (quantity === productAvaible || quantity + productQuantity === productAvaible || quantity <= productAvaible) {
    await correctCondition
      .validateAsync(req.body, { abortEarly: false })
      .then(() => next())
      .catch(() => {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid price data'))
      })
  } else if (
    quantity + productQuantity > product.quantity ||
    quantity > product.quantity ||
    quantity > productAvaible ||
    quantity + productQuantity > productAvaible
  ) {
    next(
      new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Quantity is greater than product quantity available: ${productAvaible}`
      )
    )
  } else {
    await correctCondition
      .validateAsync(req.body, { abortEarly: false })
      .then(() => next())
      .catch(() => {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid price data'))
      })
  }
}

const updatePrice = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().required().trim(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    color: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional(),
    type: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional(),
    size: Joi.object({
      name: Joi.string().required().trim(),
      code: Joi.string()
    }).optional()
  })

  // kiểm tra xem số lượng từng sản phẩm có vượt quá số lượng sản phẩm cha hay không
  const { productId, quantity } = req.body
  const productQuantity = await productService.getTotalProductByProductId(productId)
  const product = await productService.getProductById(productId)
  const productAvaible = product.quantity - productQuantity + quantity

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

  if (quantity === productAvaible || quantity + productQuantity === productAvaible) {
    await correctCondition
      .validateAsync(req.body, { abortEarly: false })
      .then(() => next())
      .catch(() => {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid price data'))
      })
  } else {
    next(
      new ApiError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Quantity is greater than product quantity available: ${productAvaible}`
      )
    )
  }
}

export const productValidation = {
  createProduct,
  updateProduct,
  updateQuantity,
  getProductByPriceRange,
  addPriceToProduct,
  updatePrice
}

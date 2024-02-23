import { StatusCodes } from 'http-status-codes'
import { cartService } from '~/services/cartService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const addToCart = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const cart = await cartService.createCart({ ...req.body, userId })

    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getCartByUserId = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    validateMongodbId(userId)
    const carts = await cartService.getCartByUserId(userId)

    res.status(StatusCodes.OK).json({ carts })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getCartByProductId = async (req, res, next) => {
  try {
    const { productId } = req.body
    validateMongodbId(productId)
    const carts = await cartService.getCartByProductId(productId)

    res.status(StatusCodes.OK).json({ carts })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const cart = await cartService.updateCart(id, req.body)

    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteCartById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const cart = await cartService.deleteCartById(id)

    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const clearCartByUserId = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    validateMongodbId(userId)
    const cart = await cartService.clearCartByUserId(userId)

    res.status(StatusCodes.OK).json({ cart })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const cartController = {
  addToCart,
  getCartByUserId,
  getCartByProductId,
  updateCart,
  deleteCartById,
  clearCartByUserId
}

import { StatusCodes } from 'http-status-codes'
import { orderService } from '~/services/orderService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body)

    res.status(StatusCodes.OK).json({ order })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrder()

    res.status(StatusCodes.OK).json({ orders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getOrderByUserId = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    validateMongodbId(userId)
    const orders = await orderService.getOrderByUserId(userId)

    res.status(StatusCodes.OK).json({ orders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const order = await orderService.getOrderById(id)

    res.status(StatusCodes.OK).json({ order })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getOrderByStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const orders = await orderService.getOrderByStatus(status)

    res.status(StatusCodes.OK).json({ orders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getOrderByIdAndStatus = async (req, res, next) => {
  try {
    const { id: orderId } = req.params
    const { status } = req.body
    const orders = await orderService.getOrderByIdAndStatus(orderId, status)

    res.status(StatusCodes.OK).json({ orders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { orderStauts } = req.body
    const updatedStatus = await orderService.updateStatus(id, orderStauts)

    res.status(StatusCodes.OK).json({ updatedStatus })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedOrder = await orderService.updateOrder(id, req.body)

    res.status(StatusCodes.OK).json({ updatedOrder })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const orderController = {
  createOrder,
  getAllOrder,
  getOrderByUserId,
  getOrderById,
  getOrderByStatus,
  getOrderByIdAndStatus,
  updateOrder,
  updateOrderStatus
}

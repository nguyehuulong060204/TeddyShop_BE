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

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrder()

    res.status(StatusCodes.OK).json({ orders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getOrders = async (req, res, next) => {
  try {
    const { status, orderDate, month } = req.query

    if (!status && !orderDate && !month) {
      // Truy vấn tất cả đơn hàng
      const orders = await orderService.getAllOrder()
      return res.status(StatusCodes.OK).json({ orders })
    }

    let filteredOrders = []

    if (status) {
      const decodedStatus = decodeURIComponent(status)
      const ordersByStatus = await orderService.getOrderByStatus(decodedStatus)
      filteredOrders = ordersByStatus
    }

    if (orderDate) {
      const ordersByDate = await orderService.getOrderByOrderDate(orderDate)
      filteredOrders = filteredOrders.filter((order) => {
        return ordersByDate.includes(order) // Giữ các đơn hàng có trong danh sách trên
      })
    }

    if (month) {
      const ordersByMonth = await orderService.getOrderByMonth(month)
      filteredOrders = filteredOrders.filter((order) => {
        return ordersByMonth.includes(order) // Giữ các đơn hàng có trong danh sách trên
      })
    }

    // Loại bỏ các đơn hàng trùng lặp
    const uniqueOrders = Array.from(new Set(filteredOrders))

    res.status(StatusCodes.OK).json({ orders: uniqueOrders })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error from server, please try again'))
  }
}

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { orderStatus } = req.body
    const updatedStatus = await orderService.updateStatus(id, orderStatus)

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
  getOrders,
  updateOrder,
  updateOrderStatus
}

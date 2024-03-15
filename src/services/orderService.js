import Order from '~/models/orderModel'
import { v4 as uuidv4 } from 'uuid'

const createOrder = async (orderData) => {
  const orderCode = uuidv4().replace('-', '').slice(0, 10).toUpperCase()
  const newOrderData = {
    ...orderData,
    orderId: orderCode
  }
  return await Order.create(newOrderData)
}

const getAllOrder = async () => {
  return await Order.find().populate('orderItems.product', 'name').populate('user', 'fullName').sort({ orderDate: -1 })
}

const getOrderByUserId = async (userId) => {
  return await Order.find({ user: userId })
    .populate('orderItems.product', 'name images')
    .populate('user', 'fullName')
    .sort({ orderDate: -1 })
}

const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate('orderItems.product', 'name')
}

const getOrderByStatus = async (orderStatus) => {
  return await Order.find({ orderStatus: orderStatus })
    .populate('orderItems.product', 'name')
    .populate('user', 'fullName')
    .sort({ orderDate: -1 })
}

const getOrderByIdAndStatus = async (orderId, orderStatus) => {
  return await Order.find({ _id: orderId, orderStatus: orderStatus })
    .populate('user', 'fullName')
    .populate('orderItems.product', 'name')
}

const getOrderByOrderDate = async (orderDate) => {
  return await Order.find({ orderDate: orderDate })
    .populate('orderItems.product', 'name images')
    .populate('user', 'fullName')
}

const getOrderByMonth = async (month) => {
  return await Order.find({ orderDate: { $month: month } })
    .populate('orderItems.product', 'name')
    .populate('user', 'fullName')
}

const updateStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true })
}

const updateOrder = async (orderId, orderData) => {
  return await Order.findByIdAndUpdate(orderId, orderData, { new: true })
}

const cancelOrder = async (orderId, cancelDate) => {
  return await Order.findByIdAndUpdate(orderId, { orderStatus: 'Đã hủy', cancellationDate: cancelDate }, { new: true })
}

export const orderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  getOrderByStatus,
  getOrderByIdAndStatus,
  getOrderByOrderDate,
  getOrderByMonth,
  updateStatus,
  updateOrder,
  cancelOrder
}

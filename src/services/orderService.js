import Order from '~/models/orderModel'

const createOrder = async (orderData) => {
  return await Order.create(orderData)
}

const getAllOrder = async () => {
  return await Order.find().populate('orderItems.product', 'name').populate('user', 'fullName').sort({ orderDate: -1 })
}

const getOrderByUserId = async (userId) => {
  return await Order.find({ user: userId })
    .populate('orderItems.product', 'name')
    .populate('user', 'fullName')
    .sort({ orderDate: -1 })
}

const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate('orderItems.product', 'name')
}

const getOrderByStatus = async (orderStatus) => {
  return await Order.find({ orderStauts: orderStatus })
    .populate('orderItems.product', 'name')
    .populate('user', 'fullName')
    .sort({ orderDate: -1 })
}

const getOrderByIdAndStatus = async (orderId, orderStatus) => {
  return await Order.find({ _id: orderId, orderStauts: orderStatus })
    .populate('user', 'fullName')
    .populate('orderItems.product', 'name')
}

const updateStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { orderStauts: status }, { new: true })
}

const updateOrder = async (orderId, orderData) => {
  return await Order.findByIdAndUpdate(orderId, orderData, { new: true })
}

export const orderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  getOrderByStatus,
  getOrderByIdAndStatus,
  updateStatus,
  updateOrder
}

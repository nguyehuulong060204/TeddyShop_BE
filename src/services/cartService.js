import Cart from '~/models/cartModel'

const createCart = async (cartData) => {
  return await Cart.create(cartData)
}

const getCartByUserId = async (userId) => {
  return await Cart.find({ userId: userId })
}

const getCartByProductId = async (productId) => {
  return await Cart.find({ productId: productId })
}

const updateCart = async (cartId, cartData) => {
  const cart = await Cart.findByIdAndUpdate(
    cartId,
    { price: cartData?.price, quantity: cartData.quantity },
    { new: true }
  )

  cart.totalPrice = cart.price * cart.quantity
  await cart.save()

  return cart
}
const deleteCartById = async (cartId) => {
  return await Cart.findByIdAndDelete(cartId, { new: true })
}

const clearCartByUserId = async (userId) => {
  return await Cart.deleteMany({ userId: userId })
}

export const cartService = {
  createCart,
  getCartByUserId,
  getCartByProductId,
  updateCart,
  deleteCartById,
  clearCartByUserId
}

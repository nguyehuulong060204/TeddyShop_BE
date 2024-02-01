import Product from '~/models/productModel'
import Price from '~/models/priceModel'

import { slugify } from '~/utils/formatters'

// update khi người dùng thanh toán thì mới trừ sản phẩm và cập nhật lại trạng thái sản phẩm

// product
const createProduct = async (productData) => {
  const newProductData = {
    ...productData,
    slug: slugify(productData.name)
  }

  return Product.create(newProductData)
}

const getAllProduct = async () => {
  return await Product.find()
}

const getProductById = async (productId) => {
  return await Product.findById(productId).populate('attributes')
}

const getBestSellingProducts = async (limit) => {
  return await Product.find({ status: 'active' }).sort({ quantitySold: -1 }).limit(limit)
}

const searchProductByName = async (productName) => {
  const keySearach = slugify(productName)

  return await Product.find({ slug: { $regex: keySearach, $options: 'i' } }).populate('attributes')
}

const getProductByCategoryId = async (categoryId) => {
  return await Product.find({ category: categoryId })
}

// Tìm product theo minPrice và maxPrice
const getProductByPriceRange = async (minPrice, maxPrice) => {
  return await Price.find({ price: { $gte: minPrice, $lte: maxPrice } }).populate('productId')
}

const getNewestProducts = async (limit) => {
  return await Product.find().sort({ createdAt: -1 }).limit(limit)
}

// lấy sản phẩm dự trên từ khóa tag
const getProductsByTag = async (tag) => {
  return await Product.find({ tags: { $in: [tag] } })
}

// update status về inactive khi hết sản phẩm
const updateProductStatus = async () => {
  const outOfStockProduct = await Product.find({ quantityAvailable: { $lte: 0 } })
  await Product.updateMany(
    { _id: { $in: outOfStockProduct.map((product) => product._id) } },
    { $set: { status: 'inactive' } }
  )
}

// update khi người dùng đã mua hàng
const updateProductQuantityWhenBuy = async (productId, quantityPurchased) => {
  const product = await Product.findById(productId)

  const quantity = product.quantity - quantityPurchased
  const quantitySold = product.quantitySold + quantityPurchased
  const quantityAvailable = product.quantity - quantityPurchased
  // khi người dùng mua hàng thì cập nhật lại trạng thái sản phẩm
  updateProductStatus()

  return Product.findByIdAndUpdate(
    productId,
    {
      quantity,
      quantitySold,
      quantityAvailable
    },
    { new: true }
  )
}

// update khi người dùng thêm sản phẩm vào giỏ hàng
const updateProductQuantityWhenAddToCart = async (productId, quantityPurchased) => {
  const product = await Product.findById(productId)

  const quantity = product.quantity - quantityPurchased
  const quantityAvailable = product.quantity - quantityPurchased

  return Product.findByIdAndUpdate(
    productId,
    {
      quantity,
      quantityAvailable
    },
    { new: true }
  )
}

const updateProduct = async (productId, productData) => {
  const newProductData = {
    ...productData,
    slug: slugify(productData.name)
  }

  return await Product.findByIdAndUpdate(productId, newProductData, { new: true })
}

const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId)
}

// price
// Thêm price vào product khi tạo thành công
const addPriceToProduct = async (priceData) => {
  const price = await Price.create(priceData)
  await Product.findByIdAndUpdate(priceData.productId, { $push: { attributes: price._id } })

  return price
}

// lấy tất cả giá của sản phẩm theo id
const getPriceByProductId = async (productId) => {
  return await Price.find({ productId })
}

// update giá trị price theo productID
const updatePriceByProductId = async (id, data) => {
  return await Price.findByIdAndUpdate(id, data, { new: true })
}

const deletePrice = async (id) => {
  await Price.deleteOne({ _id: id })
  await Product.updateOne({ attributes: id }, { $pull: { attributes: id } })
}

// tính tổng sản phẩm đang có theo productId
const getTotalProductByProductId = async (productId) => {
  const prices = await Price.find({ productId })
  let total = 0
  prices.forEach((price) => {
    total += price.quantity
  })

  return total
}

export const productService = {
  createProduct,
  getPriceByProductId,
  getAllProduct,
  getProductById,
  getProductByPriceRange,
  getNewestProducts,
  getProductsByTag,
  updateProduct,
  updateProductQuantityWhenBuy,
  updateProductQuantityWhenAddToCart,
  deleteProduct,
  searchProductByName,
  getBestSellingProducts,
  getProductByCategoryId,
  addPriceToProduct,
  updatePriceByProductId,
  deletePrice,
  getTotalProductByProductId
}

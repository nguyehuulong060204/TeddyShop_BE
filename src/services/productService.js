import Product from '~/models/productModel'
import { slugify } from '~/utils/formatters'
import { v4 as uuidv4 } from 'uuid'

// update khi người dùng thanh toán thì mới trừ sản phẩm và cập nhật lại trạng thái sản phẩm

// product
const createProduct = async (productData) => {
  const productCode = uuidv4().replace('-', '').slice(0, 10).toUpperCase()
  const newProductData = {
    ...productData,
    slug: slugify(productData.name),
    productCode: productCode
  }

  return Product.create(newProductData)
}

const getAllProduct = async () => {
  return await Product.find().populate('brand', 'name').populate('category', 'name')
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

const updateProduct = async (productId, productData) => {
  const newProductData = {
    ...productData,
    slug: slugify(productData.name)
  }

  return await Product.findByIdAndUpdate(productId, newProductData, { new: true })
}

const updateProductPrice = async (productId, attributes) => {
  return await Product.findByIdAndUpdate(productId, { $push: { attributes: attributes } }, { new: true })
}

const deleteProductPrice = async (productId, attributesId) => {
  return await Product.findByIdAndUpdate(productId, { $pull: { attributes: { _id: attributesId } } }, { new: true })
}

const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId)
}

// // tính tổng sản phẩm đang có theo productId
// const getTotalProductByProductId = async (productId) => {
//   const prices = await Price.find({ productId })
//   let total = 0
//   prices.forEach((price) => {
//     total += price.quantity
//   })

//   return total
// }

export const productService = {
  createProduct,
  getAllProduct,
  getProductById,
  getNewestProducts,
  getProductsByTag,
  updateProduct,
  updateProductQuantityWhenBuy,
  deleteProduct,
  searchProductByName,
  getBestSellingProducts,
  getProductByCategoryId,
  updateProductPrice,
  deleteProductPrice
}

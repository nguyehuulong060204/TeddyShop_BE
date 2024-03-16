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

// lấy sản phẩm bán chạy
const getBestSellingProducts = async (limit) => {
  return await Product.find({ status: 'active' }).sort({ quantitySold: -1 }).limit(limit)
}

// lấy sản phẩm theo tên
const searchProductByName = async (productName) => {
  const keySearach = slugify(productName)

  return await Product.find({ slug: { $regex: keySearach, $options: 'i' } }).populate('attributes')
}

// lấy sản phẩm theo danh mục
const getProductByCategoryId = async (categoryId) => {
  return await Product.find({ category: categoryId })
}

// lấy sản phẩm mới
const getNewestProducts = async (limit) => {
  return await Product.find().sort({ createdAt: -1 }).limit(limit)
}

// lấy sản phẩm dự trên từ khóa tag
const getProductsByTag = async (tag) => {
  return await Product.find({ tags: { $in: [tag] } })
}

// lấy sản phẩm theo hãng sản xuất
const getProductByBrandId = async (brandId) => {
  return await Product.find({ brand: brandId })
}

// lấy sản phẩm theo giá
const getProductByPrice = async (minPrice, maxPrice) => {
  return await Product.find({ price: { $gte: minPrice, $lte: maxPrice } })
}

// lấy sản phẩm theo tên a-z : z-a -1,1
const getProductByName = async (sort) => {
  return await Product.find().sort({ name: sort })
}

// update status về inactive khi hết sản phẩm
const updateProductStatus = async () => {
  const outOfStockProduct = await Product.find({ quantityAvailable: { $lte: 0 } })
  await Product.updateMany(
    { _id: { $in: outOfStockProduct.map((product) => product._id) } },
    { $set: { status: 'inactive' } }
  )
}

const updateQuantityAttributes = async (productId, attributeData) => {
  const product = await Product.findById(productId)
  const productAttributes = product.attributes.find((attribute) => attribute._id.toString() === attributeData._id)
  if (productAttributes) {
    return await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          'attributes.$[elem].quantity': attributeData.quantity
        }
      },
      {
        arrayFilters: [{ 'elem._id': attributeData._id }],
        new: true
      }
    )
  }
}

const updateProductQuantityWhenBuy = async (orderData) => {
  let updatedProduct = null

  for (let i = 0; i < orderData?.length; i++) {
    const { productId, quantity, attributeId } = orderData[i]

    const product = await Product.findById(productId)
    if (product) {
      product.quantity -= quantity
      product.quantitySold = product.quantitySold + quantity
      product.quantityAvailable = product.quantity

      // update quantity attributes
      if (attributeId) {
        const productAttributes = product.attributes.find((attribute) => attribute._id.toString() === attributeId)
        if (productAttributes) {
          productAttributes.quantity -= quantity
          await updateQuantityAttributes(productId, productAttributes)
        }
      }

      // Cập nhật số lượng vào cơ sở dữ liệu
      await product.save()

      await updateProductStatus()

      updatedProduct = product // Lưu sản phẩm đã được cập nhật số lượng
    }
  }

  return updatedProduct // Trả về sản phẩm đã được cập nhật số lượng sau khi vòng lặp kết thúc
}

const updateProduct = async (productId, productData) => {
  const newProductData = {
    ...productData,
    slug: slugify(productData.name)
  }

  return await Product.findByIdAndUpdate(productId, newProductData, { new: true })
}

const updateProductPrice = async (productId, attributes) => {
  const product = await Product.findById(productId)
  const caculateQuantity = (await product.attributes.reduce((acc, cur) => acc + cur.quantity, 0)) + attributes.quantity
  return await Product.findByIdAndUpdate(
    productId,
    { $push: { attributes: attributes }, quantity: caculateQuantity },
    { new: true }
  )
}

const deleteProductPrice = async (productId, attributesId) => {
  return await Product.findByIdAndUpdate(productId, { $pull: { attributes: { _id: attributesId } } }, { new: true })
}

const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId)
}

export const productService = {
  createProduct,
  getAllProduct,
  getProductById,
  getNewestProducts,
  getProductsByTag,
  getProductByBrandId,
  getProductByPrice,
  getProductByName,
  updateProduct,
  updateProductQuantityWhenBuy,
  deleteProduct,
  searchProductByName,
  getBestSellingProducts,
  getProductByCategoryId,
  updateProductPrice,
  deleteProductPrice
}

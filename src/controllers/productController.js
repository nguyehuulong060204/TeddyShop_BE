import { StatusCodes } from 'http-status-codes'
import { productService } from '~/services/productService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

// Product
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body)

    res.status(StatusCodes.OK).json({ product })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const product = await productService.getProductById(id)

    res.status(StatusCodes.OK).json(product)
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllProduct = async (req, res, next) => {
  try {
    let products
    const { limit, name, category } = req.query
    if (limit) {
      products = await productService.getBestSellingProducts(limit)
    } else if (name) {
      products = await productService.searchProductByName(name)
    } else if (category) {
      validateMongodbId(category)
      products = await productService.getProductByCategoryId(category)
    } else {
      products = await productService.getAllProduct()
    }

    res.status(StatusCodes.OK).json({ products })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getProductsByTag = async (req, res, next) => {
  try {
    const { tag } = req.query
    const products = await productService.getProductsByTag(tag)

    res.status(StatusCodes.OK).json({ products })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedProduct = await productService.updateProduct(id, req.body)

    res.status(StatusCodes.OK).json({ updatedProduct })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deletedProduct = await productService.deleteProduct(id)

    res.status(StatusCodes.OK).json({ deletedProduct })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateProductPrice = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedProduct = await productService.updateProductPrice(id, req.body)

    res.status(StatusCodes.OK).json({ updatedProduct })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteProductPrice = async (req, res, next) => {
  try {
    const { id, attributesId } = req.params
    const updatedProduct = await productService.deleteProductPrice(id, attributesId)

    res.status(StatusCodes.OK).json({ updatedProduct })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateProductQuantityWhenBuy = async (req, res, next) => {
  try {
    const { orderData } = req.body
    const updatedProduct = await productService.updateProductQuantityWhenBuy(orderData)

    res.status(StatusCodes.OK).json({ updatedProduct })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, error.message))
  }
}

export const productController = {
  createProduct,
  getProductById,
  getAllProduct,
  getProductsByTag,
  updateProduct,
  updateProductQuantityWhenBuy,
  updateProductPrice,
  deleteProduct,
  deleteProductPrice
}

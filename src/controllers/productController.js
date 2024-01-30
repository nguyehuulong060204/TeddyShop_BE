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

const getProductByPriceRange = async (req, res, next) => {
  try {
    const { minPrice, maxPrice } = req.query
    const products = await productService.getProductByPriceRange(minPrice, maxPrice)

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

const updateProductQuantityWhenBuy = async (req, res, next) => {
  try {
    const { productId, quantityPurchased } = req.body
    const updatedQuantity = await productService.updateProductQuantityWhenBuy(productId, quantityPurchased)

    res.status(StatusCodes.OK).json({ updatedQuantity })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateProductQuantityWhenAddToCart = async (req, res, next) => {
  try {
    const { productId, quantityPurchased } = req.body
    const updatedQuantity = await productService.updateProductQuantityWhenAddToCart(productId, quantityPurchased)

    res.status(StatusCodes.OK).json({ updatedQuantity })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

// Price
const addPriceToProduct = async (req, res, next) => {
  try {
    const price = await productService.addPriceToProduct(req.body)

    res.status(StatusCodes.OK).json({ price })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getPriceByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params
    validateMongodbId(productId)

    const prices = await productService.getPriceByProductId(productId)

    res.status(StatusCodes.OK).json({ prices })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updatePriceByProductId = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedPrice = await productService.updatePriceByProductId(id, req.body)

    res.status(StatusCodes.OK).json({ updatedPrice })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deletePrice = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deletedPrice = await productService.deletePrice(id)

    res.status(StatusCodes.OK).json({ deletedPrice })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const productController = {
  createProduct,
  getPriceByProductId,
  getProductById,
  getAllProduct,
  getProductByPriceRange,
  getProductsByTag,
  updateProduct,
  updateProductQuantityWhenBuy,
  updateProductQuantityWhenAddToCart,
  deleteProduct,
  addPriceToProduct,
  updatePriceByProductId,
  deletePrice
}

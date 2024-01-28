import { StatusCodes } from 'http-status-codes'
import { productCatService } from '~/services/productCatService'
import validateMongodbId from '~/utils/validateMongodbId'

const createCategory = async (req, res, next) => {
  try {
    const productCat = await productCatService.createCategory(req.body)

    res.status(StatusCodes.OK).json({ productCat })
  } catch (error) {
    next(error)
  }
}

const getAllCategory = async (req, res, next) => {
  try {
    const productCategories = await productCatService.getAllCategory()

    res.status(StatusCodes.OK).json({ productCategories })
  } catch (error) {
    next(error)
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const category = await productCatService.getCategoryById(id)

    res.status(StatusCodes.OK).json({ category })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedCategory = await productCatService.updateCategory(id, req.body)

    res.status(StatusCodes.OK).json({ updatedCategory })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deleteCategory = await productCatService.deleteCategory(id)

    res.status(StatusCodes.OK).json({ deleteCategory })
  } catch (error) {
    next(error)
  }
}

export const productCategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}

import { StatusCodes } from 'http-status-codes'
import { blogCatService } from '~/services/blogCatService'
import validateMongodbId from '~/utils/validateMongodbId'

const createCategory = async (req, res, next) => {
  try {
    const productCat = await blogCatService.createCategory(req.body)

    res.status(StatusCodes.OK).json({ productCat })
  } catch (error) {
    next(error)
  }
}

const getAllCategory = async (req, res, next) => {
  try {
    const productCategories = await blogCatService.getAllCategory()

    res.status(StatusCodes.OK).json({ productCategories })
  } catch (error) {
    next(error)
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const category = await blogCatService.getCategoryById(id)

    res.status(StatusCodes.OK).json({ category })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedCategory = await blogCatService.updateCategory(id, req.body)

    res.status(StatusCodes.OK).json({ updatedCategory })
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deleteCategory = await blogCatService.deleteCategory(id)

    res.status(StatusCodes.OK).json({ deleteCategory })
  } catch (error) {
    next(error)
  }
}

export const blogCategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}

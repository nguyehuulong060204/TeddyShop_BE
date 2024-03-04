import { StatusCodes } from 'http-status-codes'
import { blogCatService } from '~/services/blogCatService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createCategory = async (req, res, next) => {
  try {
    const blogCat = await blogCatService.createCategory(req.body)

    res.status(StatusCodes.OK).json({ blogCat })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllCategory = async (req, res, next) => {
  try {
    const blogCategories = await blogCatService.getAllCategory()

    res.status(StatusCodes.OK).json({ blogCategories })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const category = await blogCatService.getCategoryById(id)

    res.status(StatusCodes.OK).json({ category })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedCategory = await blogCatService.updateCategory(id, req.body)

    res.status(StatusCodes.OK).json({ updatedCategory })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deleteCategory = await blogCatService.deleteCategory(id)

    res.status(StatusCodes.OK).json({ deleteCategory })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const blogCategoryController = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}

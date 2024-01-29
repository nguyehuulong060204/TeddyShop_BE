import { StatusCodes } from 'http-status-codes'
import { blogService } from '~/services/blogService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body)
    res.status(StatusCodes.OK).json({ blog })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllBlog = async (req, res, next) => {
  try {
    const { name } = req.query
    let blogs
    if (name) {
      blogs = await blogService.searchBlogByName(name)
    } else {
      blogs = await blogService.getAllBlog()
    }

    res.status(StatusCodes.OK).json({ blogs })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const blog = await blogService.getBlogById(id)

    res.status(StatusCodes.OK).json({ blog })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedBlog = await blogService.updateBlog(id, req.body)

    res.status(StatusCodes.OK).json({ updatedBlog })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deletedBlog = await blogService.deleteBlog(id)

    res.status(StatusCodes.OK).json({ deletedBlog })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getBlogByCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)

    const blogs = await blogService.getBlogsByCategory(id)

    res.status(StatusCodes.OK).json({ blogs })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const likeBlog = async (req, res, next) => {
  try {
    const { id } = req.params
    const userId = req.user ? req.user._id : ''

    const likedBlog = await blogService.likeBlog(id, userId)

    res.status(StatusCodes.OK).json({ likedBlog })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const blogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogByCategory,
  likeBlog
}

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createBlog = async (req, res, next) => {
  const conrrectConditon = Joi.object({
    name: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    thumbnail: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    }).optional(),
    tag: Joi.string(),
    blogCategory: Joi.string().required(),
    createdBy: Joi.string().required()
  })

  await conrrectConditon
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid blog data'))
    })
}

const updateBlog = async (req, res, next) => {
  const conrrectConditon = Joi.object({
    name: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    thumbnail: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    }).optional(),
    tag: Joi.string(),
    blogCategory: Joi.string().required(),
    createdBy: Joi.string().required()
  })

  await conrrectConditon
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid blog data'))
    })
}

export const blogValidation = {
  createBlog,
  updateBlog
}

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createBlogCat = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalida Blog Category Data'))
    })
}

const updateBlogCat = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    name: Joi.string().required().trim(),
    description: Joi.string().trim().optional(),
    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string(),
          url: Joi.string()
        })
      )
      .optional()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalida Blog Category Data'))
    })
}

export const blogCaterogryValidation = {
  createBlogCat,
  updateBlogCat
}

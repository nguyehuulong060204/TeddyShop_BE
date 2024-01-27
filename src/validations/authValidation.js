import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim(),
    fullName: Joi.string().required().trim(),
    password: Joi.string().required().min(8).trim(),
    avatar: Joi.object({
      public_id: Joi.string(),
      url: Joi.string()
    })
  })
  await correctCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid user data'))
    })
}

const loginUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(8).trim()
  })

  await correctCondition
    .validateAsync(req.body, { ebortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Wrong email or password'))
    })
}

export const authValidation = {
  createUser,
  loginUser
}

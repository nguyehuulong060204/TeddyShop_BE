import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

import ApiError from '~/utils/ApiError'

const createFeedback = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    fullName: Joi.string().required().trim(),
    email: Joi.string().email().required(),
    content: Joi.string().trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid feedback data'))
    })
}

const updateFeedbackStatus = async (req, res, next) => {
  const conrrectCondition = Joi.object({
    status: Joi.string()
      .valid('Đang chờ xử lý', 'Đang xử lý', 'Đã hoàn thành', 'Đã hủy', 'Đã gửi mail', 'Đã xác nhận')
      .required()
      .trim()
  })

  await conrrectCondition
    .validateAsync(req.body, { abortEarly: false })
    .then(() => next())
    .catch(() => {
      next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, 'Invalid feedback data'))
    })
}

export const feedbackValidation = {
  createFeedback,
  updateFeedbackStatus
}

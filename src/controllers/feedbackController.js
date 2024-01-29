import { StatusCodes } from 'http-status-codes'
import { feedbackService } from '~/services/feedbackService'
import ApiError from '~/utils/ApiError'

const createFeedback = async (req, res, next) => {
  try {
    const feedback = await feedbackService.createFeedback(req.body)

    res.status(StatusCodes.OK).json({ feedback })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllFeedBack = async (req, res, next) => {
  try {
    const { status } = req.query
    let feedbacks
    if (status) {
      feedbacks = await feedbackService.getFeelbackByStatus(status)
    } else {
      feedbacks = await feedbackService.getAllFeddback()
    }

    res.status(StatusCodes.OK).json({ feedbacks })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateFeedbackStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedFeedback = await feedbackService.updateFeedbackStatus(id, status)

    res.status(StatusCodes.OK).json({ updatedFeedback })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const feedbackController = {
  createFeedback,
  getAllFeedBack,
  updateFeedbackStatus
}

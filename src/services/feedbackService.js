import Feedback from '~/models/feedbackModel'

const createFeedback = async (feedbackData) => {
  return await Feedback.create(feedbackData)
}

const getAllFeddback = async () => {
  return await Feedback.find()
}

const getFeelbackByStatus = async (stauts) => {
  return await Feedback.find({ status: stauts })
}

const updateFeedbackStatus = async (feedbackId, status) => {
  return await Feedback.findByIdAndUpdate(feedbackId, { status }, { new: true })
}

export const feedbackService = {
  createFeedback,
  getAllFeddback,
  getFeelbackByStatus,
  updateFeedbackStatus
}

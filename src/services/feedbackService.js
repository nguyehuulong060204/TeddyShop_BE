import Feedback from '~/models/FeedbackModel'

const createFeedback = async (feedbackData) => {
  return await Feedback.create(feedbackData)
}

const getAllFeddback = async () => {
  return await Feedback.find()
}

const getFeelbackByStatus = async (stauts) => {
  return await Feedback.find({ status: stauts })
}

const getFeelbackById = async (id) => {
  return await Feedback.findById(id)
}

const updateFeedbackStatus = async (feedbackId, status) => {
  return await Feedback.findByIdAndUpdate(feedbackId, { status }, { new: true })
}

export const feedbackService = {
  createFeedback,
  getAllFeddback,
  getFeelbackByStatus,
  updateFeedbackStatus,
  getFeelbackById
}

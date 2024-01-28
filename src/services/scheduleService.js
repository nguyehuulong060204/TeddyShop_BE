import Schedule from '~/models/scheduleModel'

const createSchedule = async (brandData) => {
  return await Schedule.create(brandData)
}

const getAllScheduleByEvent = async (eventId) => {
  return await Schedule.find({ eventId: eventId })
}

const getScheduleById = async (scheduleId) => {
  return await Schedule.findById(scheduleId)
}

const updateSchedule = async (scheduleId, scheduleData) => {
  return await Schedule.findByIdAndUpdate(scheduleId, scheduleData, { new: true })
}

const deleteSchedule = async (scheduleId) => {
  return await Schedule.findByIdAndDelete(scheduleId, { new: true })
}

export const scheduleService = {
  createSchedule,
  getAllScheduleByEvent,
  getScheduleById,
  updateSchedule,
  deleteSchedule
}

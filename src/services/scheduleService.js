import Schedule from '~/models/scheduleModel'

const createSchedule = async (scheduleData) => {
  return await Schedule.create(scheduleData)
}

const getAllScheduleByEvent = async (eventId) => {
  return await Schedule.find({ eventId: eventId }).populate('eventId', 'name')
}

const getAllSchedule = async () => {
  return await Schedule.find().populate('eventId', 'name')
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
  getAllSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule
}

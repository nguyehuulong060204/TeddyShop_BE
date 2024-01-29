import Event from '~/models/EventModel'
import { slugify } from '~/utils/formatters'

const createEvent = async (eventData) => {
  const newEvent = {
    ...eventData,
    slug: slugify(eventData.name)
  }

  return await Event.create(newEvent)
}

const getAllEvent = async () => {
  return await Event.find().populate('members')
}

const getEventById = async (eventId) => {
  return await Event.findById(eventId)
}

// lấy sự kiện theo tên
const getEventByName = async (name) => {
  const keySearch = slugify(name)
  return await Event.find({ slug: { $regex: keySearch, $options: 'i' } }).populate('members')
}

// lấy sự kiện theo khoảng thời gian
const getEventsByDateRange = async (startDate, endDate) => {
  return await Event.find({
    startDate: { $gte: new Date(startDate) },
    endDate: { $lte: new Date(endDate) }
  })
}

// lấy sự kiện sau khi đã sắp xếp asc = tăng dần , desc = giảm dần
const getEventsSortedByDate = async (sortDirection) => {
  const sortOption = sortDirection === 'asc' ? 1 : -1
  return await Event.find().sort({ startDate: sortOption })
}

// lấy sự kiện theo vị trí
const getEventByLocation = async (location) => {
  return await Event.find({ location: { $regex: location, $options: 'i' } }).populate('members')
}

// lấy theo tên + vị trí
const getEventByNameAndLocation = async (name, location) => {
  const keySearch = slugify(name)
  return await Event.find({
    slug: { $regex: keySearch, $options: 'i' },
    location: { $regex: location, $options: 'i' }
  }).populate('members')
}

// lấy sự kiện diễn ra trong tương lai
const getUpcomingEvents = async () => {
  const currentDate = new Date()
  return await Event.find({ startDate: { $gte: currentDate } })
}

const updateEvent = async (eventId, eventData) => {
  const newEvent = {
    ...eventData,
    slug: slugify(eventData.name)
  }

  return await Event.findByIdAndUpdate(eventId, newEvent, { new: true })
}

const deleteEvent = async (eventId) => {
  return await Event.findByIdAndDelete(eventId)
}

export const eventService = {
  createEvent,
  getAllEvent,
  getEventById,
  getEventByName,
  getEventsByDateRange,
  getEventByLocation,
  getEventsSortedByDate,
  getEventByNameAndLocation,
  getUpcomingEvents,
  updateEvent,
  deleteEvent
}

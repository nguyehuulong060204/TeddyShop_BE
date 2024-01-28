import { StatusCodes } from 'http-status-codes'
import { memberService } from '~/services/memeberService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createMember = async (req, res, next) => {
  try {
    const member = await memberService.createMember(req.body)

    res.status(StatusCodes.OK).json({ member })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Cannot create member.'))
  }
}

const getAllMember = async (req, res, next) => {
  try {
    const members = await memberService.getAllMember()

    res.status(StatusCodes.OK).json({ members })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Cannot read members.'))
  }
}

const getMemberById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const member = await memberService.getMemberById(id)

    res.status(StatusCodes.OK).json({ member })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Cannot get member by id.'))
  }
}

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const updatedMember = await memberService.updateMember(id, req.body)

    res.status(StatusCodes.OK).json({ updatedMember })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Cannot update member by id.'))
  }
}

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const deleteMember = await memberService.deleteMember(id)

    res.status(StatusCodes.OK).json({ deleteMember })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Canot delete member.'))
  }
}

export const memberController = {
  createMember,
  getAllMember,
  updateMember,
  getMemberById,
  deleteMember
}

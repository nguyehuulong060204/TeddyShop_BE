import Member from '~/models/memberModel'

const createMember = async (data) => {
  return await Member.create(data)
}

const getAllMember = async () => {
  return await Member.find()
}

const getMemberById = async (memberId) => {
  return await Member.findById(memberId)
}

const updateMember = async (memberId, data) => {
  return await Member.findByIdAndUpdate(memberId, data, { new: true })
}

const deleteMember = async (memberId) => {
  return await Member.findByIdAndDelete(memberId)
}

export const memberService = {
  createMember,
  getAllMember,
  getMemberById,
  updateMember,
  deleteMember
}

import Member from '~/models/memberModel'

const createMember = async (data) => {
  return await Member.create(data)
}

const getAllMember = async () => {
  return await Member.find()
}

const getMemberByName = async (fullName) => {
  const regex = new RegExp(fullName, 'i')
  console.log(regex)
  return await Member.find({ fullName: regex })
}

const getMemberByPosition = async (position) => {
  return await Member.find({ position: position })
}

const getMemberByEmail = async (email) => {
  return await Member.find({ email: email })
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
  deleteMember,
  getMemberByName,
  getMemberByPosition,
  getMemberByEmail
}

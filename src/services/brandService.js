import Brand from '~/models/brandModel'

const createBrand = async (brandData) => {
  return await Brand.create(brandData)
}

const getAllBrand = async () => {
  return await Brand.find()
}

const getBrandById = async (brandId) => {
  return await Brand.findById(brandId)
}

const updateBrand = async (brandId, brandData) => {
  return await Brand.findByIdAndUpdate(brandId, brandData, { new: true })
}

const deleteBrandById = async (brandId) => {
  return await Brand.findByIdAndDelete(brandId, { new: true })
}

// Truyền các trường muốn sắp xếp vào ví dụ { name: "" }, { createdAt: -1, 1 }
const getAllBrandSorted = async (sortOptions) => {
  return await Brand.find().sort(sortOptions)
}

// Truyền tên của hãy muốn lấy vào
const searchBrandForName = async (brandName) => {
  return await Brand.find().sort({ name: brandName })
}

export const brandService = {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrandById,
  getAllBrandSorted,
  searchBrandForName
}

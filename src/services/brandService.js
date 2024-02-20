import Brand from '~/models/brandModel'

const createBrand = async (brandData) => {
  return await Brand.create(brandData)
}

const getAllBrand = async () => {
  return await Brand.find().populate('productCategory', 'name').sort({ totalProduct: -1 })
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

const addProductToBrand = async (brandId, productId) => {
  await Brand.findByIdAndUpdate(brandId, { $push: { products: productId } })

  const brand = await Brand.findById(brandId)
  const productCount = brand.products.length

  const updatedBrand = await Brand.findByIdAndUpdate(brandId, { totalProduct: productCount }, { new: true })

  return updatedBrand
}

const deleteProductFromBrand = async (brandId, productId) => {
  await Brand.findByIdAndUpdate(brandId, { $pull: { products: productId } })

  const brand = await Brand.findById(brandId)
  const productCount = brand.products.length

  const updatedBrand = await Brand.findByIdAndUpdate(brandId, { totalProduct: productCount }, { new: true })

  return updatedBrand
}

export const brandService = {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrandById,
  getAllBrandSorted,
  searchBrandForName,
  addProductToBrand,
  deleteProductFromBrand
}

import ProductCategory from '~/models/productCategoriesModel'

const createCategory = async (categoryData) => {
  return await ProductCategory.create(categoryData)
}

const getAllCategory = async () => {
  return await ProductCategory.find()
}

const getCategoryById = async (catId) => {
  return await ProductCategory.findById(catId)
}

const updateCategory = async (catId, catData) => {
  return await ProductCategory.findByIdAndUpdate(catId, catData, { new: true })
}

const deleteCategory = async (catId) => {
  return await ProductCategory.findByIdAndDelete(catId, { new: true })
}

export const productCatService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}

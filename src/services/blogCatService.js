import BlogCategory from '~/models/blogCategoryModel'

const createCategory = async (blogCatData) => {
  return await BlogCategory.create(blogCatData)
}

const getAllCategory = async () => {
  return await BlogCategory.find()
}

const getCategoryById = async (catId) => {
  return await BlogCategory.findById(catId)
}

const updateCategory = async (catId, catData) => {
  return await BlogCategory.findByIdAndUpdate(catId, catData, { new: true })
}

const deleteCategory = async (catId) => {
  return await BlogCategory.findByIdAndDelete(catId, { new: true })
}

export const blogCatService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
}

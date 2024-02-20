import ProductCategory from '~/models/productCategoriesModel'

const createCategory = async (categoryData) => {
  return await ProductCategory.create(categoryData)
}

const getAllCategory = async () => {
  return await ProductCategory.find().populate('products')
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

const addProductToCategory = async (catId, productId) => {
  await ProductCategory.findByIdAndUpdate(catId, { $push: { products: productId } })

  const category = await ProductCategory.findById(catId)
  const productCount = category.products.length

  const updatedCategory = await ProductCategory.findByIdAndUpdate(catId, { totalProduct: productCount }, { new: true })

  return updatedCategory
}

const deleteProductFromCategory = async (catId, productId) => {
  await ProductCategory.findByIdAndUpdate(catId, { $pull: { products: productId } })

  const category = await ProductCategory.findById(catId)
  const productCount = category.products.length

  const updatedCategory = await ProductCategory.findByIdAndUpdate(catId, { totalProduct: productCount }, { new: true })

  return updatedCategory
}

export const productCatService = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addProductToCategory,
  deleteProductFromCategory
}

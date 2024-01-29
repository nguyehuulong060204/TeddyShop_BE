import Blog from '~/models/blogModel'
import { slugify } from '~/utils/formatters'

const createBlog = async (blogData) => {
  const newBlogData = {
    ...blogData,
    slug: slugify(blogData.name)
  }

  return await Blog.create(newBlogData)
}

const getAllBlog = async () => {
  return await Blog.find().sort({ likes: -1, views: -1 })
}

const getBlogById = async (blogId) => {
  return await Blog.findOneAndUpdate({ _id: blogId }, { $inc: { views: 1 } }, { new: true })
}

const getBlogsByCategory = async (categoryId) => {
  return await Blog.find({ blogCategory: categoryId }).sort({ createdAd: -1 })
}

const likeBlog = async (blogId, userId) => {
  const blog = await Blog.findById(blogId)

  // Kiểm tra xem người dùng đã like bài viết trước đó chưa
  const isLiked = blog.likedBy.includes(userId)

  if (isLiked) {
    // Nếu người dùng đã like, xóa họ khỏi danh sách likedBy và giảm số lượng likes đi 1
    blog.likedBy.pull(userId)
    blog.likes -= 1
  } else {
    // Nếu người dùng chưa like, thêm họ vào danh sách likedBy và tăng số lượng likes lên 1
    blog.likedBy.push(userId)
    blog.likes += 1
  }

  await blog.save()

  return blog
}

const searchBlogByName = async (blogName) => {
  const keySearch = slugify(blogName)
  return await Blog.find({ slug: { $regex: keySearch, $options: 'i' } })
}

/*các chức năng có thể phát triển tiếp:
- Thêm bài viết vào danh sách yêu thích
- Xóa bài viết khỏi danh xác yêu thích
*/

const updateBlog = async (blogId, blogData) => {
  const newBlogData = {
    ...blogData,
    slug: slugify(blogData.name)
  }

  return await Blog.findByIdAndUpdate(blogId, newBlogData, { new: true })
}

const deleteBlog = async (blogId) => {
  return await Blog.findByIdAndDelete(blogId)
}

export const blogService = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  likeBlog,
  searchBlogByName,
  deleteBlog,
  getBlogsByCategory
}

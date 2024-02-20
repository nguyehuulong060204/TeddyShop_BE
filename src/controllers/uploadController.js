import fs from 'fs'
import { cloudinaryUploadImage, cloudinaryDeleteImage } from '~/utils/cloudinary'

const uploadImages = async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImage(path, 'images')
    const urls = []
    const files = req.files
    for (const file of files) {
      const { path } = file
      const newpath = await uploader(path)
      // eslint-disable-next-line no-console
      console.log(newpath)
      urls.push(newpath)
      fs.unlinkSync(path)
    }
    const images = urls.map((file) => {
      return file
    })
    res.json(images)
  } catch (error) {
    throw new Error(error)
  }
}

const deleteImages = async (req, res) => {
  const { id } = req.params
  try {
    // eslint-disable-next-line no-unused-vars
    const deleted = await cloudinaryDeleteImage(id, 'images')
    res.json({ message: 'Deleted', id })
  } catch (error) {
    throw new Error(error)
  }
}

export { uploadImages, deleteImages }

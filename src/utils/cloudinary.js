import cloudinary from 'cloudinary'
import { env } from '~/config/environment'

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.API_KEY,
  api_secret: env.API_SECRET
})

const cloudinaryUploadImage = (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      resolve(
        { url: result.secure_url, asset_id: result.asset_id, public_id: result.public_id },
        { resource_type: 'auto' }
      )
    })
  })
}

const cloudinaryDeleteImage = (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        { url: result.secure_url, asset_id: result.asset_id, public_id: result.public_id },
        { resource_type: 'auto' }
      )
    })
  })
}

export { cloudinaryUploadImage, cloudinaryDeleteImage }

import express from 'express'
import { deleteImages, uploadImages } from '~/controllers/uploadController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { uploadImage, uploadPhoto } from '~/middlewares/uploadImages'

const Router = express.Router()

Router.post('/', authMiddleware, uploadPhoto.array('images', 10), uploadImage, uploadImages)
Router.delete('/:id', authMiddleware, deleteImages)

export const uploadRouter = Router

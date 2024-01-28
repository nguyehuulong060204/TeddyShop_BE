import { StatusCodes } from 'http-status-codes'
import { brandService } from '~/services/brandService'
import ApiError from '~/utils/ApiError'
import validateMongodbId from '~/utils/validateMongodbId'

const createBrand = async (req, res, next) => {
  try {
    const brand = await brandService.createBrand(req.body)

    res.status(StatusCodes.OK).json({ brand })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getAllBrand = async (req, res, next) => {
  try {
    const brands = await brandService.getAllBrand()

    res.status(StatusCodes.OK).json({ brands })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params
    validateMongodbId(id)
    const brand = await brandService.getBrandById(id)

    res.status(StatusCodes.OK).json({ brand })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedbrand = await brandService.updateBrand(id, req.body)

    res.status(StatusCodes.OK).json({ updatedbrand })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

const deleteBrandById = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedBrand = await brandService.deleteBrandById(id)

    res.status(StatusCodes.OK).json({ message: 'Deleted Successfully', deletedBrand })
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, 'Error form server, please try again'))
  }
}

export const brandController = {
  createBrand,
  getAllBrand,
  getBrandById,
  updateBrand,
  deleteBrandById
}

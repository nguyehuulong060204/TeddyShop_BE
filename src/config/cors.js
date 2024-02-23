import { WHITELIST_DOMAINS } from '~/utils/constanst'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Cấu hình CORS
export const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép gọi API bằng POSTMAN trên môi trường dev
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true)
    }

    // Kiểm tra xem origin có phải là domain được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // Nếu không phải, trả về lỗi
    callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} is not allowed by CORS Policy.`))
  },
  optionsSuccessStatus: StatusCodes.OK,

  // CORS cho phép nhận cookies từ request
  credentials: true,

  // Header "set-cookie" được phép truy cập từ phía client
  exposedHeaders: ['set-cookie']
}

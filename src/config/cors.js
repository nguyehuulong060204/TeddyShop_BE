import { WHITELIST_DOMAINS } from '~/utils/constanst'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'

// config cors
export const corsOptions = {
  origin: function (origin, callback) {
    // cho phép việc gọi API bằng POSTMEN trên môi trường dev
    if (!origin && env.BUILD_MODE === 'development') {
      return callback(null, true)
    }

    // kiểm tra xem origin có phải là domein được chấp nhận hay không
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    // nếu không phải thì trả về lỗi
    callback(new Error('Not allowed by CORS'))
  },
  optionsSuccessStatus: StatusCodes.OK,

  // cors sẽ cho phép nhận cookies từ qequest
  credential: true
}

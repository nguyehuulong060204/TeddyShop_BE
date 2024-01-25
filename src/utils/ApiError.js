/**
 * Định nghĩa riêng một Class ApiError để kế thừa class Erorr đã có sẵn
 */

class ApiError extends Error {
  constructor(statusCode, message) {
    // Goị tớ hàm khởi tạo của class Erorr để dùng this
    // Thằng cha (Error) có property message rồi nên gọi nó luôn trong super
    super(message)

    // Tên của custom Error, nếu không set thì mặc định nó sẽ kế thừa là 'Error'
    this.name = 'ApiError'

    // Gán thêm http status code cho custom Error
    this.statusCode = statusCode

    // Ghi lại stack reace để thuận tiện cho việc debug
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError

const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var feedbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    submitDate: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      default: 'Đang chờ xử lý',
      enum: ['Đang chờ xử lý', 'Đang xử lý', 'Đã hoàn thành', 'Đã hủy', 'Đã gửi mail', 'Đã xác nhận']
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Feedback', feedbackSchema)

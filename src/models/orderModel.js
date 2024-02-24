const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      fullName: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      other: {
        type: String
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        color: {
          type: String,
          required: true
        },
        type: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    ],
    orderDate: {
      type: Date,
      required: true
    },
    totalPrice: {
      type: String,
      required: true
    },
    totalPriceAfterDiscount: {
      type: String,
      default: 0
    },
    orderStatus: {
      type: String,
      default: 'Chờ xác nhận',
      enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng', 'Giao hàng thành công']
    },
    month: {
      type: String,
      default: new Date().getMonth() + 1
    },
    paymentMethod: {
      type: String,
      enum: ['Thẻ tín dụng', 'Thanh toán khi nhận hàng', 'Thanh toán qua ví điện tử']
    },
    cancellationDate: {
      type: Date
    },
    fullFilledDate: {
      type: Date
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Order', orderSchema)

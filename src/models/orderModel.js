const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      uppercase: true
    },
    shippingInfo: {
      fullName: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
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
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        color: {
          name: String,
          code: String
        },
        switch: {
          name: String,
          code: String
        },
        option: {
          name: String,
          code: String
        },
        attributeId: {
          type: String
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
      enum: ['Chờ xác nhận', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao hàng', 'Đã hủy']
    },
    month: {
      type: String,
      default: new Date().getMonth() + 1
    },
    paymentMethod: {
      type: String,
      enum: ['Thanh toán khi nhận hàng', 'Thanh toán qua ví điện tử']
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

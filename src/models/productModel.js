const mongoose = require('mongoose')

var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    priceOld: {
      type: Number
    },
    price: {
      type: Number,
      required: true
    },
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Price'
      }
    ],
    // số lượng tổng
    quantity: {
      type: Number,
      required: true
    },
    // số lượng đã bán
    quantitySold: {
      type: Number,
      default: 0
    },
    // số lượng có sẵn
    quantityAvailable: {
      type: Number,
      default: 0
    },
    // bảo hành: ví dụ 6 tháng, 12 tháng,...
    warranty: {
      type: String,
      required: true
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductCategory',
      required: true
    },
    images: [
      {
        public_id: String,
        url: String
      }
    ],
    tags: [
      {
        type: String
      }
    ],
    ratings: [
      {
        start: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
    totalRating: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'inactive']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Product', productSchema)

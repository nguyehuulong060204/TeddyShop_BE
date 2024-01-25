const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      lowercase: true
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
    color: [
      {
        name: String,
        code: String
      }
    ],
    type: [
      {
        name: String,
        code: String
      }
    ],
    quantity: {
      type: Number,
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
        name: String
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

const mongoose = require('mongoose')

var priceSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    color: {
      name: String,
      code: String
    },
    type: {
      name: String,
      code: String
    },
    size: {
      name: String,
      code: String
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Price', priceSchema)

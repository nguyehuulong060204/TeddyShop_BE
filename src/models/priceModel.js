const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
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
    color: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('User', priceSchema)

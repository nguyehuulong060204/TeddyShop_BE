const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjeactId,
      ref: 'User',
      required: true
    },
    productId: {
      type: mongoose.Schema.Types.ObjeactId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    type: {
      name: String,
      code: String
    },
    color: {
      name: String,
      code: String
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Cart', cartSchema)

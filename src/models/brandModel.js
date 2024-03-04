const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slogan: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    logo: {
      public_id: String,
      url: String
    },
    thumbnail: {
      public_id: String,
      url: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    productCategory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory'
      }
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    totalProduct: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Brand', brandSchema)

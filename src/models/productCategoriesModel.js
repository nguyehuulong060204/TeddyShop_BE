const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      require: true
    },
    slogan: {
      type: String
    },
    tags: [],
    isActive: {
      type: Boolean,
      default: true
    },
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
module.exports = mongoose.model('ProductCategory', productCategorySchema)

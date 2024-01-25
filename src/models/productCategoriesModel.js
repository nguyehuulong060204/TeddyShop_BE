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
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema)

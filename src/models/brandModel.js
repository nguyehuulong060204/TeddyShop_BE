const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
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
    isActive: {
      type: Boolean,
      default: true
    },
    totalProducts: {
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

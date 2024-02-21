const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('BlogCategory', blogCategorySchema)

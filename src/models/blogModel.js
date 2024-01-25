const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      uniquie: true,
      required: true,
      lowercase: true
    },
    content: {
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
    views: {
      type: Number,
      default: 0
    },
    blogCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Blog', blogSchema)

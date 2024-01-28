const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      public_id: String,
      url: String
    },
    links: [
      {
        name: String,
        url: String
      }
    ]
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Member', memberSchema)

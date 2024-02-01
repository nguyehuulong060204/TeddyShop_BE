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
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      zalo: String
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    startWorkingDate: {
      type: Date,
      required: true,
      default: Date.now()
    },
    endWorkingDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Member', memberSchema)

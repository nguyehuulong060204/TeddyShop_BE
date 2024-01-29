const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var feedbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // },
    submitDate: {
      type: Date,
      default: new Date()
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'approved', 'rejected']
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Feedback', feedbackSchema)

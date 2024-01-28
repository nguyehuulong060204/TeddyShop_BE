const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      require: true
    },
    time: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    tags: [
      {
        type: String,
        required: true
      }
    ],
    images: [
      {
        type: String,
        required: true
      }
    ],
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true
      }
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Event', eventSchema)

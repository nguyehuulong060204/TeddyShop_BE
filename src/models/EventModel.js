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
    tag: {
      type: String,
      required: true
    },
    images: [
      {
        public_id: String,
        url: String
      }
    ],
    schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
      }
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['Sự kiện', 'Cuộc thi', 'Hội thảo', 'Khác'] //  Loại sự kiện
    }
  },
  {
    timestamps: true
  }
)

//Export the model
module.exports = mongoose.model('Event', eventSchema)

const mongoose = require('mongoose') // Erase if already required

// Declare the Schema of the Mongo model
var scheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  images: [
    {
      public_id: String,
      url: String
    }
  ],
  type: [],
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
})

//Export the model
module.exports = mongoose.model('Schedule', scheduleSchema)

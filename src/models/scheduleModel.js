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
  time: {
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
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
})

//Export the model
module.exports = mongoose.model('Schedule', scheduleSchema)

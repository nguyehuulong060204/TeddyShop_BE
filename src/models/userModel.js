const mongoose = require('mongoose')

var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    address: [
      {
        fullName: {
          type: String,
          required: true
        },
        phoneNumber: {
          type: String,
          required: true
        },
        location: {
          type: String
        },
        city: {
          type: String
        },
        state: {
          type: String
        },
        isActive: {
          type: Boolean,
          default: true
        }
      }
    ],
    birthday: {
      type: Date
    },
    gender: {
      type: String
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    refreshToken: {
      type: String
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpores: String
  },
  { timestamps: true }
)

//Export the model
module.exports = mongoose.model('User', userSchema)

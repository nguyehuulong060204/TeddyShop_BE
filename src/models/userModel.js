const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      private: true
    },
    role: {
      type: String,
      default: 'user'
    },
    address: [
      {
        fullName: {
          type: String
        },
        phoneNumber: {
          type: String
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
    refreshTokens: [
      {
        token: {
          type: String
        }
      }
    ],
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpores: String,
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    avatar: {
      public_id: String,
      url: String
    }
  },
  { timestamps: true }
)

// check email đã tồn tại chưa, mã hóa password, kiểm tra password

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
  return !!user
}

userSchema.pre('save', async function (next) {
  const user = this
  const salt = await bcrypt.genSalt(10)
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, salt)
  }

  next()
})

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

//Export the model
module.exports = mongoose.model('User', userSchema)

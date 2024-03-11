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
    phoneNumber: {
      type: String
    },
    addresses: [
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
        type: {
          type: String,
          required: true,
          enum: ['Nhà riêng', 'Văn phòng']
        },
        isDefault: {
          type: Boolean,
          default: false
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
    passwordChangeAt: Date, // thời gian thay đổi mật khẩu
    passwordResetExpores: Date, // thời gian hết hạn để reset mật khẩu
    passwordResetToken: String, // mã token để reset mật khẩu// mã token để xác thực email
    emailVerificationCode: String, // mã code để xác thực email
    emailVerificationDate: Date, // thời gian hết hạn để xác thực email
    emailVerified: {
      type: Boolean,
      default: false
    },
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    favoriteBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ],
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

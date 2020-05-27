const mongoose = require('mongoose');
const { omit, pick } = require('lodash');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { roles } = require('../config/roles');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    profile: {
      name: {
        type: String,
        trim: true,
      },
      nickname: {
        type: String,
        trim: true,
      },
      thumbnail: {
        type: String,
        default: '/static/img/default_thumbnail',
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown',
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    status: {
      type: String,
      enum: ['normal', 'secession', 'denied'],
      default: 'normal',
    },
    social: {
      facebook: {
        id: String,
        accessToken: String,
      },
      google: {
        id: String,
        accessToken: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: { getters: true },
  }
);

userSchema
  .virtual('passwordConfirmation')
  .get(() => {
    return this._passwordConfirmation;
  })
  .set((value) => {
    this._passwordConfirmation = value;
  });

userSchema
  .virtual('originPassword')
  .get(() => {
    return this._originPassword;
  })
  .set((value) => {
    this._originPassword = value;
  });

userSchema
  .virtual('currentPassword')
  .get(() => {
    return this._currentPassword;
  })
  .set((value) => {
    this._currentPassword = value;
  });

userSchema
  .virtual('newPassword')
  .get(() => {
    return this._newPassword;
  })
  .set((value) => {
    this._newPassword = value;
  });

userSchema
  .virtual('isReset')
  .get(() => {
    return this._isReset;
  })
  .set((value) => {
    this._isReset = value;
  });

userSchema.path('password').validate(function () {
  const user = this;

  // case: register
  if (user.isNew) {
    if (!user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'password confirmation is required');
    } else if (user.password !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'password Confirmation does not matched');
    }
  }

  // case: update
  if (!user.isNew) {
    if (!user.currentPassword && !user.isReset) {
      user.invalidate('currentPassword', 'current password is required');
    } else if (user.currentPassword !== user.originPassword) {
      user.invalidate('currentPassword', 'current password does not match with original password');
    }
  }
});

userSchema.statics.findByName = function (name) {
  return this.findOne({ 'profile.name': name }).exec();
};

userSchema.methods.toJSON = function () {
  const user = this;
  return omit(user.toObject(), ['password', '_id']);
};

userSchema.methods.transform = function () {
  const user = this;
  return pick(user.toJSON(), ['id', 'profile', 'email', 'role']);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

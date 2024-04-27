import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';
import { emailRegexp } from '../constants/constants.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      require: true,
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
      // required: [true, 'Verify code is required'],
    },
  },
  { versionKey: false, timeseries: true }
);

userSchema.pre('findOneAndUpdate', setUpdateSetting);

userSchema.post('save', handleSaveError);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;

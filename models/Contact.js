import { Schema, model } from 'mongoose';
import { emailRegexp } from '../constants/constants.js';
import { phoneRegexp } from '../constants/contactsConstants.js';
import { handleSaveError, setUpdateSetting } from './hooks.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      unique: true,
      match: phoneRegexp,
      required: [true, 'Set phone for contact'],
    },
    favorite: {
      type: Boolean,
      default: false,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', setUpdateSetting);

contactSchema.post('save', handleSaveError);

contactSchema.post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;

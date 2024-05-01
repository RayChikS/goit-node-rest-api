import Joi from 'joi';
import { emailRegexp } from '../constants/constants.js';
import { phoneRegexp } from '../constants/contactsConstants.js';

export const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
})
  .min(1)
  .message('Body must have at least one field');

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

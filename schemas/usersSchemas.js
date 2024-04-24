import Joi from 'joi';
import { emailRegexp } from '../constants/constants.js';
import { passwordRegexp } from '../constants/userConstants.js';

export const userSingupSinginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).required(),
});

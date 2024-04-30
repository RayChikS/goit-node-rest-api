const Joi = require("joi");

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = verifyEmailSchema;

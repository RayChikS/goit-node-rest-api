const { Schema, model } = require("mongoose");
const {
  handleSchemaValidationErrors,
  SUBSCRIPTION_TYPES,
} = require("../helpers");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_TYPES,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

const User = model("user", userSchema);

module.exports = {
  User,
};

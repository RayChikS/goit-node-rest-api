import { model, Schema } from "mongoose";

import handleMongooseError from "../helpers/handleMongooseError.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSchema.post("save", handleMongooseError);

export const Contact = model("contact", contactSchema);

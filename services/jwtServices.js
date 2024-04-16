import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { SECRET_KEY, EXPIRES_IN } = process.env;

export const loginToken = (id) => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: EXPIRES_IN });
};

export const checkToken = (token) => {
  if (!token) {
    throw HttpError(401, "Unauthorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    return id;
  } catch (error) {
    throw HttpError(401, "Unauthorized");
  }
};

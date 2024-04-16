import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import {
  register,
  checkEmail,
  generateHash,
  checkPassword,
  saveToken,
  deleteToken,
} from "../services/usersServices.js";
import { loginToken } from "../services/jwtServices.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await checkEmail(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await generateHash(password);

  const result = await register({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await checkEmail(email);
  const passwordCompare = await checkPassword(email, password);

  if (!user || !passwordCompare) {
    throw HttpError(401, "Unauthorized");
  }

  const token = loginToken(user._id);
  await saveToken(user._id, token);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

export const logoutUser = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const newToken = "";

  await deleteToken(_id, newToken);

  res.status(204);
});

export const getCurrent = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
});

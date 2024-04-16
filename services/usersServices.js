import bcrypt from "bcrypt";

import { User } from "../models/user.js";

export async function register(data) {
  const user = await User.create(data);
  return user;
}

export async function checkEmail(data) {
  const user = await User.findOne({ data });
  return user;
}

export async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
}

export async function checkPassword(email, password) {
  const user = await checkEmail(email);
  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword;
}

export async function findUserById(id) {
  const user = await User.findById(id);
  return user;
}

export async function saveToken(id, token) {
  const newUser = await User.findByIdAndUpdate(id, { token });
  return newUser;
}

export async function deleteToken(id, newToken) {
  const newUser = await User.findByIdAndUpdate(id, { token: newToken });
  return newUser;
}
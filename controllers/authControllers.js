import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authServices from '../services/authServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const { JWT_SECRET } = process.env;

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (user) throw HttpError(409, 'Email in use');
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await authServices.singup({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) throw HttpError(401, 'Email or password is wrong');
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, 'Email or password is wrong');
  const { _id: id } = user;
  const payload = { id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
  await authServices.updateUser({ _id: id }, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: null });
  res.status(204).send();
};

export default {
  singup: ctrlWrapper(singup),
  singin: ctrlWrapper(singin),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};

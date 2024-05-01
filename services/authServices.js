import User from '../models/User.js';

const findUser = filter => User.findOne(filter);

const singup = data => User.create(data);

const updateUser = (filter, data) => User.findByIdAndUpdate(filter, data);

export default {
  findUser,
  singup,
  updateUser,
};

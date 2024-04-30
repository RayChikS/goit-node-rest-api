const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../../models/users");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password, avatarURL } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email,
      avatarURL,
      subscription: user.subscription,
    },
  });
};

module.exports = login;

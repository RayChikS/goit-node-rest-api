const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { User } = require("../../models/users");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  await User.create({ email, avatarURL, password: hashPassword });

  res.status(201).json({
    user: {
      email,
      avatarURL,
      subscription: "starter",
    },
  });
};

module.exports = signup;

const { User } = require("../../models/users");

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).json();
};

module.exports = logout;

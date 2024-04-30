const createError = require("http-errors");
const { User } = require("../../models/users");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw createError(404, "User not found");

  await User.findByIdAndUpdate(user.id, {
    verificationToken: null,
    verify: true,
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;

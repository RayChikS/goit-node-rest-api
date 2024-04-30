const createError = require("http-errors");
const { User } = require("../../models/users");

const subscription = async (req, res) => {
  const updatedSubscription = await User.findByIdAndUpdate(
    req.user._id,
    req.body
  );
  if (!updatedSubscription) throw createError(404, "Not found");

  const { email, subscription } = updatedSubscription;
  res.json({ email, subscription });
};

module.exports = subscription;

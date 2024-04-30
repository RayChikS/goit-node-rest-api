const current = async (req, res) => {
  const { email, avatarURL, subscription } = req.user;
  res.json({ email, avatarURL, subscription });
};

module.exports = current;

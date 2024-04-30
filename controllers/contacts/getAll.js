const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite) query.favorite = favorite;

  const contacts = await Contact.find(query, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(contacts);
};

module.exports = getAll;

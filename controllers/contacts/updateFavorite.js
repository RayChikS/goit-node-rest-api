const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const updatedContact = await updateStatusContact(
    { _id: contactId, owner },
    req.body
  );
  if (!updatedContact) throw createError(404, "Not found");

  res.json(updatedContact);
};

const updateStatusContact = async (filter, body) => {
  return await Contact.findOneAndUpdate(filter, body, { new: true });
};

module.exports = updateFavorite;

const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) throw createError(404, "Not found");

  res.json(contact);
};

module.exports = getById;

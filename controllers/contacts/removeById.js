const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const deletedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner,
  });
  if (!deletedContact) throw createError(404, "Not found");

  res.json({ message: "contact deleted" });
};

module.exports = removeById;

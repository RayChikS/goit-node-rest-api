const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!updatedContact) throw createError(404, "Not found");

  res.json(updatedContact);
};

module.exports = updateById;

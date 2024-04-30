const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isValidId = (req, _, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const isCorrectId = isValidObjectId(contactId);

  if (!isCorrectId)
    next(createError(400, `${contactId} is not correct id format`));

  next();
};

module.exports = isValidId;

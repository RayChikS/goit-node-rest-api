import contactsServices from '../services/contactsServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactsServices.listContacts({ owner }, { skip, limit });
  const total = await contactsServices.countContacts({ owner });
  res.json({ result, total });
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.getContactByFilter({ owner, _id: id });
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.updateContactByFilter({ owner, _id: id }, req.body);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.removeContactByFilter({ owner, _id: id });
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

const updateContactStatus = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await contactsServices.updateContactStatusByFilter({ owner, _id: id }, req.body);
  if (!result) throw HttpError(404, `Not found`);
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  deleteContact: ctrlWrapper(deleteContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactStatus: ctrlWrapper(updateContactStatus),
};

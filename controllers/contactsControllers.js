import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
  updateStatusContact,
} from "../services/contactsServices.js";
import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await listContacts(owner);

  res.status(200).json(result);
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await getContactById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
});

export const createContact = catchAsync(async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact(req.body, owner);

  res.status(201).json(result);
});

export const updateContact = catchAsync(async (req, res) => {
  if (Object.keys(req.body).length < 1) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const result = await updateById(id, req.body);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
});

export const updateStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await updateStatusContact(id, req.body);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json(result);
});

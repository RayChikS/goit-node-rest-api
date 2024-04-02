import { nanoid } from "nanoid";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
} from "../services/contactsServices.js";
import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const result = await listContacts();

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
  const { name, email, phone } = req.body;

  const result = await addContact(name, email, phone);

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

import { Contact } from "../models/contactModel.js";

export async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
}

export async function addContact(data) {
  const newContact = await Contact.create(data);
  return newContact;
}

export async function updateById(contactId, data) {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
    new: true,
  });
  return updatedContact;
}

export async function updateStatusContact(contactId, body) {
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  return updatedContact;
}

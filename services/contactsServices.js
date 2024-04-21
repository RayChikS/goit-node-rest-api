import { Contact } from "../models/contact.js";

export async function listContacts(owner) {
  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
  return contacts;
}

export async function getContactById(contactId, owner) {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: owner,
  });
  return contact || null;
}

export async function removeContact(contactId, owner) {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: owner,
  });
  return deletedContact;
}

export async function addContact(data, owner) {
  const newContact = await Contact.create({ ...data, owner });
  return newContact;
}

export async function updateById(contactId, owner, data) {
  const updatedContact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: owner,
    },
    data,
    {
      new: true,
    }
  );
  return updatedContact;
}

export async function updateStatusContact(contactId, owner, body) {
  const updatedContact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: owner,
    },
    body,
    {
      new: true,
    }
  );
  return updatedContact;
}

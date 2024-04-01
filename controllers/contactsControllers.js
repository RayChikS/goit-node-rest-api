import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  const contacts = contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = (req, res) => {
  const { id } = req.params;
  const contact = contactsService.getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(contact);
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  const deletedContact = contactsService.removeContact(id);
  if (!deletedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(deletedContact);
};

export const createContact = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, and phone" });
  }
  const newContact = contactsService.addContact(name, email, phone);
  res.status(201).json(newContact);
};

export const updateContact = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res
      .status(400)
      .json({ message: "Please provide name, email, or phone to update" });
  }
  const updatedContact = contactsService.updateContact(id, {
    name,
    email,
    phone,
  });
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(updatedContact);
};

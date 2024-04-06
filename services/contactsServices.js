// В вашем файле contactServices.js

import ContactModel from "../models/contactModel.js";

export async function listContacts() {
  return await ContactModel.find();
}

export async function getContactById(contactId) {
  return await ContactModel.findById(contactId);
}

export async function removeContact(contactId) {
  return await ContactModel.findByIdAndRemove(contactId);
}

export async function addContact(name, email, phone) {
  return await ContactModel.create({ name, email, phone });
}

export async function updateById(contactId, data) {
  return await ContactModel.findByIdAndUpdate(contactId, data, { new: true });
}

export async function updateStatusContact(contactId, data) {
  return await ContactModel.findByIdAndUpdate(contactId, data, { new: true });
}
// import { promises as fs } from "fs";
// import path from "path";
// import { nanoid } from "nanoid";

// const contactsPath = path.join("db", "contacts.json");

// export async function listContacts() {
//   const readResult = await fs.readFile(contactsPath);
//   const resultArray = JSON.parse(readResult);
//   return resultArray;
// }

// export async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);
//   return contact || null;
// }

// export async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(index, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return result;
// }

// export async function addContact(name, email, phone) {
//   const contacts = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name: name,
//     email: email,
//     phone: phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// }

// export async function updateById(contactId, data) {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   contacts[index] = { ...contacts[index], ...data };
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// }

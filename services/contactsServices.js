import fs from "fs/promises";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removedContact = contacts.splice(index, 1);
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return removedContact[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (error) {
    return null;
  }
}

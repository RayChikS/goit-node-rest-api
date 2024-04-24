import Contact from '../models/Contact.js';

const listContacts = (filter = {}, setting = {}) =>
  Contact.find(filter, '-createdAt -updatedAt', setting).populate('owner', 'email subscription');

const countContacts = filter => Contact.countDocuments(filter);

const addContact = data => Contact.create(data);

const getContactByFilter = filter => Contact.findOne(filter);

const updateContactByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data);

const removeContactByFilter = filter => Contact.findOneAndDelete(filter);

const updateContactStatusByFilter = (filter, data) => Contact.findOneAndUpdate(filter, data);

export default {
  listContacts,
  countContacts,
  addContact,
  getContactByFilter,
  updateContactByFilter,
  removeContactByFilter,
  updateContactStatusByFilter,
};

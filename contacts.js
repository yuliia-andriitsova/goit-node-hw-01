const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const res = await contacts.find(({ id }) => id === contactId.toString());
    if (!res) return null;
    return res;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedListContacts = contacts.filter(
      ({ id }) => id !== contactId.toString()
    );
    fs.writeFile(contactsPath, JSON.stringify(updatedListContacts, null, '\t'));
    return updatedListContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactNew = { id: nanoid(), name, email, phone };
    const contacts = await listContacts();
    const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t');
    fs.writeFile(contactsPath, contactsList);
    return contactNew;
  } catch (error) {
    console.error(error);
  }
}

const doOperationsWithContacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = doOperationsWithContacts;

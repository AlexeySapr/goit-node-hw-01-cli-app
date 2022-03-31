const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const dataStr = await fs.readFile(contactsPath, "utf-8");
  const contactsList = JSON.parse(dataStr);
  return contactsList;
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find(contact => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContactsList = contactsList.filter(
    (contact, index) => index !== idx,
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
  return contactsList[idx];
}

async function addContact(name, email, phone) {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

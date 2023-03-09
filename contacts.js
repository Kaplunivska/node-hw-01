const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("./db/contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    return contactsList;
}

async function listContacts() {
    try {
      const contactsList = await read();
      console.log(contactsList);
    } catch (error) {
      return error.message;
    }
}
  
async function getContactById(contactId) {
    try {
        const contactsList = await read();
        const contact = contactsList.find((cont) => cont.id === contactId);
        console.log(contact);
    } catch (error) {
        return error.message;
    }
    
}
  
async function removeContact(contactId) {
    try {
        const contactsList = await read();
        const newContactList = JSON.stringify(
            contactsList.filter((contact) => contact.id !== contactId),
            null,
            "\t"
        );
        fs.writeFile(contactsPath, newContactList);
        console.log(`Contact with id ${contactId} was successfully deleted!`);
      } catch (error) {
        return error.message;
      }
}
  
async function addContact(name, email, phone) {
    try {
     const contactsList = await read();
     const newContact = { id: nanoid(), name, email, phone };
     const isExists = contactsList.some(
       (contact) => contact.email === newContact.email
     );
    if (isExists) {
         console.log("This contact already in your contacts");
         return;
    }
    const newContactList = JSON.stringify(
      [newContact, ...contactsList],
      null,
      "\t"
    );
     fs.writeFile(contactsPath, newContactList);
     console.log(`Contact was successfully added with id ${newContact.id}`);
    } catch (error) {
        return error.message;
    }
}

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
};
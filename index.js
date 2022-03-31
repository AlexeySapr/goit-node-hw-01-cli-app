const contactsOperations = require("./contacts");
console.log("contactsOperations: ", contactsOperations);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsOperations.listContacts();
      console.log("contactsList: ", contactsList);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found!`);
      }
      console.log("contact: ", contact);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone,
      );
      console.log("added contact: ", newContact);
      break;

    case "remove":
      const deletedСontact = await contactsOperations.removeContact(id);
      if (!deletedСontact) {
        throw new Error(`Contact with id=${id} not found!`);
      }
      console.log("deletedСontact: ", deletedСontact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction({
  action: "remove",
  id: "R2I7nrbkAvzQjMaqFppWr",
});

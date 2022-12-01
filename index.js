const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const { Command } = require('commander');
const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const list = await listContacts();
      console.table(list);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log('contact in get:', contact);
      break;

    case 'add':
      const contactNew = await addContact(name, email, phone);
      console.log('contactNew', contactNew);
      break;

    case 'remove':
      const contactRemoved = await removeContact(id);
      console.log('contactRemoved', contactRemoved);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

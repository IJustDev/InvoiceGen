const InvoiceGen = require('./lib/index');
const path = require('path');

const Invoice = InvoiceGen.Invoice;
const EntityDetails = InvoiceGen.EntityDetails;
const Position = InvoiceGen.Position;

const German = InvoiceGen.German;

const senderDetails = new EntityDetails({
    firstname: 'Max',
    lastname: 'Mustermann',
    street: 'Musterstraße 34',
    city: 'Musterort',
    zipCode: '12345',
});
senderDetails.addCompanyName('MAX UG');

const receiverDetails = new EntityDetails({
    firstname: 'Maria',
    lastname: 'Head',
    street: 'Secretstreet 69',
    city: 'Randomcity',
    zipCode: '420',
});

const positions = [
    // Quantity, Description, Cost, tax, currency symbol
    new Position({
        amount: 1,
        description: 'Random position',
        cost: 20,
        currency: '€',
        tax: 19,
    }),
];

const invoice = new Invoice(
    {senderDetails, receiverDetails, positions},
    {invoiceId: 20, language: new German()});
invoice.setMessage('Thank you for your purchase!');
invoice.setImage(path.join(__dirname, 'res', 'logo.png'));
// Path, invoice-id
invoice.generate(path.join(__dirname, 'dist', 'output.pdf'));


# InvoiceGen

A npm package for generating invoices as pdf.

## Features
- Creating a full invoice with a few lines of code
- Beginnerfriendly
- Implementable in any kind of node application
- 20 lines of code for a professional invoice.
## Getting started

```
$ npm i invoicegen
```

```js
const InvoiceGen = require('invoicegen');
const path = require('path');

const Invoice = InvoiceGen.Invoice;
const EntityDetails = InvoiceGen.EntityDetails;
const Position = InvoiceGen.Position;

/**
 * Select a language
 * You can also define your own language.
 * Just export a class that extends the language class from invoicegen.
 * --------------------------------------------------------------------------
 * Currently you are able to switch between german and English just like this.
 * const German = InvoiceGen.German;
 * const English = InvoiceGen.English;
*/
const English = InvoiceGen.English;

/**
 * Specify the sender.
 */
const senderDetails = new EntityDetails({
    firstname: 'Max',
    lastname: 'Mustermann',
    street: 'Musterstraße 34',
    city: 'Musterort',
    zipCode: '12345',
});
/**
 * Add a company name to the sender.
 */
senderDetails.addCompanyName('MAX UG');

/**
 * Specify the receiver.
 */
const receiverDetails = new EntityDetails({
    firstname: 'Maria',
    lastname: 'Head',
    street: 'Secretstreet 69',
    city: 'Randomcity',
    zipCode: '420',
});

/**
 * Declare the positions you want to invoice.
*/
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

/**
 * Initialize your invoice with the sender- and receiver details and...
 * the language!
*/
const invoice = new Invoice(
    {senderDetails, receiverDetails, positions},
    {invoiceId: 20, language: new English()});

/** Set a nice thank you message */
invoice.setMessage('Thank you for your purchase!');

/** Set your logo */
invoice.setImage(path.join(__dirname, 'res', 'logo.png'));

/** And generate your pdf */
invoice.generate(path.join(__dirname, 'dist', 'output.pdf'));
```

See the examples for more information on how to use this package. Click [here][sampleE] for the generated PDF (english) and [here](sampleG) for the generated PDF (german).

[sampleE]: ./res/english.pdf
[sampleG]: ./res/german.pdf
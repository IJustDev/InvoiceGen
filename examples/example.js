const InvoiceGen = require("invoicegen");
const path = require("path");

const Invoice = InvoiceGen.Invoice;
const EntityDetails = InvoiceGen.EntityDetails;
const Position = InvoiceGen.Position;

const sender = new EntityDetails(
    "Max",
    "Mustermann",
    "Musterstraße 34",
    "Musterort",
    "12345",
);
sender.addCompanyName("MAX UG");

const receiver = new EntityDetails(
    "Maria",
    "Kopf",
    "Secretstreet 69",
    "Randomcity",
    "0420"
);

const positions = [
    // Quantity, Description, Cost, tax, currency symbol
    new Position(1, "Random position", 20, 19, "€")
];

const invoice = new Invoice(receiver, sender, positions);
invoice.setMessage("Thank you for your purchase!");
invoice.setImage(path.join(__dirname, ".." , "res", "logo.png"));
// Path, invoice-id
invoice.generate(path.join(__dirname, "..", "dist", "output.pdf"), 1337);


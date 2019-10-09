const Language = require('./language');

exports.German = class German extends Language {
    /**
     * German language
     */
    constructor() {
        super();
        this.name = 'German';
        this.amount = 'Menge';
        this.tax = 'MwSt';
        this.invoice = 'Rechnung';
        this.price = 'Preis';
        this.description = 'Beschreibung';
        this.cost = 'Kosten';
        this.position = 'Position';
        this.gross = 'Brutto';
        this.net = 'Netto';
        this.totalNet = 'Gesamtnetto';
        this.totalGross = 'Gesamtbrutto';
        this.shortHandPos = 'Pos.';
    }
};

exports.English = class English extends Language {
    /**
     * German language
     */
    constructor() {
        super();
        this.name = 'English';
        this.amount = 'Amount';
        this.tax = 'Tax';
        this.invoice = 'Invoice';
        this.price = 'Price';
        this.description = 'Description';
        this.cost = 'Cost';
        this.position = 'Position';
        this.gross = 'Gross';
        this.net = 'Net';
        this.totalNet = 'Total net';
        this.totalGross = 'Total gross';
        this.shortHandPos = 'Pos.';
    }
};

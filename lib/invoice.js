const EntityDetails = require("./entityDetails");
const Constrains = require("./constrains");
const Position = require("./position");

const PdfTable = require("voilab-pdf-table");
const pdfKit = require("pdfkit");
const fs = require("fs");

module.exports = class Invoice {

    /**
     * 
     * @param {EntityDetails} receiverDetails 
     * @param {EntityDetails} senderDetails 
     * @param {Position[]} positions 
     */
    constructor(receiverDetails, senderDetails, positions, invoiceid) {
        this.receiverDetails = receiverDetails;
        this.senderDetails = senderDetails;
        this.positions = positions;
        this.constrains = new Constrains();
        this.invoiceid = invoiceid;

        this.columns = [
            {
                id: 'pos',
                header: "Pos.",
                width: 30,
                align: 'left'
            },
            {
                id: 'quantity',
                header: 'Menge',
                width: 60,
                align: "left"
            },
            {
                id: 'description',
                header: 'Produkt',
                align: 'left',
                width: 50
            },
            {
                id: 'tax',
                header: 'MwSt',
                align: 'left',
                width: 100
            },
            {
                id: 'price',
                header: 'Netto',
                align: 'right',
                width: 80,
                style: "header",
                padding: 20
            }
        ];

    }

    setImage(imagepath) {
        this.image = imagepath;
    }

    setMessage(message) {
        this.message = message;
    }

    setInfoBlockData(infoblockData) {
        this.infoblockData = infoblockData;
    }

    get Positions() {
        return this.positions;
    }

    get SenderDetails() {
        return this.senderDetails;
    }

    get ReceiverDetails() {
        return this.receiverDetails;
    }

    generate(out, invoiceid) {
        const pdf = new pdfKit;

        pdf.pipe(fs.createWriteStream(out));
        
        this.addLogo(pdf);
        this.addReceiverInformation(pdf);
        this.addContentToInfoBox(pdf);
        this.addHeading(pdf, invoiceid);
        this.addMessage(pdf);

        this.addInvoiceTable(pdf);
        this.drawMark(pdf, this.constrains.DOCUMENT_MARGIN_TOP_FOLD_MARK);
        this.drawMark(pdf, this.constrains.DOCUMENT_MARGIN_TOP_FOLD_MARK * 2);
        pdf.end();
        return pdf;
    }

    addMessage(pdf) {
        pdf.text(this.message + "\n\n"
        , this.constrains.TEXTFIELD_MARGIN_LEFT, this.constrains.TEXTFIELD_MARGIN_TOP + 40, {
            width: this.constrains.TEXTFIELD_WIDTH,
            align: "justify"
        });
    }

    addLogo(pdf) {
        pdf.image(this.image, this.constrains.IMAGE_MARGIN_LEFT, 10, {
            fit: [this.constrains.IMAGE_WIDTH, this.constrains.IMAGE_HEIGHT],
            align: "center",
            valign: "center"
        });
    }

    addHeading(pdf, invoiceid) {
        pdf.fontSize(20);
        pdf.text("Rechnung #" + invoiceid, this.constrains.TEXTFIELD_MARGIN_LEFT, this.constrains.TEXTFIELD_MARGIN_TOP)
        pdf.fontSize(12);
    }

    addReceiverInformation(pdf) {
        pdf.fontSize(8).text(this.senderDetails.toString(true), this.constrains.ADRESS_MARGIN_LEFT, 45 * this.constrains.MMTOPT);
        pdf.fontSize(12);
        pdf.text(this.receiverDetails.toString(false), this.constrains.ADRESS_MARGIN_LEFT, 62.7 * this.constrains.MMTOPT);
    }

    addContentToInfoBox(pdf) {
        pdf.text(this.infoblockData, this.constrains.INFO_BLOCK_MARGIN_RIGHT)
    }

    addInvoiceTable(pdf) {
        const table = new PdfTable(pdf, {
        });
        table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
            column: 'description'
        })).setColumnsDefaults({
            headerBorder: '',
            align: 'right',
            padding: 10
        }).addColumns(this.columns).onPageAdded((tb) => {
            tb.addHeader();
        });
        
        let positions_as_table = []
        let netto_sum = 0, brutto_sum = 0;
        let currency ="";
        for(let i = 0; i !== this.positions.length; i++) {
            const position = this.positions[i];
            netto_sum += position.cost;
            brutto_sum += position.cost * (1+ position.Tax/100);
            currency = position.currency;
            positions_as_table.push(
                {
                    pos: i+1,
                    quantity: position.Amount,
                    description: position.Description,
                    price: Position.numberWithCommas(position.Cost) + " " + position.Currency,
                    tax: position.Tax + "%"
                }
            );
        }
        positions_as_table.push({quantity: ' ',description: '', tax: '',price: ''})
        positions_as_table.push({quantity: '',description: '', tax: 'Gesamt Netto', price: Position.numberWithCommas(netto_sum.toFixed(2)) + " " + currency})
        positions_as_table.push({quantity: '',description: '', tax: 'Gesamt Brutto', price: Position.numberWithCommas(brutto_sum.toFixed(2)) + " " + currency})

        table.addBody(positions_as_table);
    }

    drawMark(pdf, y) {
        pdf.moveTo(0, y);
        pdf.lineTo(10, y);
        pdf.stroke();
    }
}
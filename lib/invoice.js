const Constrains = require('./constrains');
const Position = require('./position');
const Language = require('./language');

const PdfTable = require('voilab-pdf-table');
const pdfKit = require('pdfkit');
const fs = require('fs');

module.exports = class Invoice {
    /**
    * @param {Object} invoiceBase
    * @param {EntityDetails} invoiceBase.receiverDetails
    * @param {EntityDetails} invoiceBase.senderDetails
    * @param {Position[]} invoiceBase.positions
    * @param {Object} options
    * @param {number} options.invoiceId
    * @param {Language} options.language
    */
    constructor(invoiceBase, options) {
        this.receiverDetails = invoiceBase.receiverDetails;
        this.senderDetails = invoiceBase.senderDetails;
        this.positions = invoiceBase.positions;
        this.constrains = Constrains;
        this.invoiceId = options.invoiceId;
        this.language = options.language;
        this.columns = [];
        this.setUpColumns();
    }
    /**
    * @param {Object} column
    * @param {number} column.id
    * @param {string} column.header
    * @param {number} column.width
    * @param {('left'|'center'|'right')} column.align
    */
    addColumn(column) {
        this.columns.push(column);
    }
    /**
    * Sets up the columns.
    */
    setUpColumns() {
        this.addColumn({id: 'pos',
            header: this.language.shortHandPos, width: 30, align: 'left'});
        this.addColumn({id: 'quantity', header: this.language.Amount,
            width: 60, align: 'left'});
        this.addColumn({id: 'description', header: this.language.Description,
            width: 50, align: 'left'});
        this.addColumn({id: 'tax', header: this.language.Tax,
            width: 100, align: 'left'});
        this.addColumn({id: 'price', header: this.language.Net,
            width: 80, align: 'left'});
    }
    /**
    * @param {string} imagePath
    */
    setImage(imagePath) {
        this.image = imagePath;
    }
    /**
    * @param {string} message
    */
    setMessage(message) {
        this.message = message;
    }
    /**
    * @param {string} infoBlockData
    */
    setInfoBlockData(infoBlockData) {
        this.infoBlockData = infoBlockData;
    }
    /**
    * @return {Position[]} positions.
    */
    get Positions() {
        return this.positions;
    }
    /**
    * @return {EntityDetails} senderDetails.
    */
    get SenderDetails() {
        return this.senderDetails;
    }
    /**
    * @return {EntityDetails} receiverDetails.
    */
    get ReceiverDetails() {
        return this.receiverDetails;
    }
    /**
    * @param {string} out filePath
    * @return {PDFKit.PDFDocument} pdf
    */
    generate(out) {
        /* eslint-disable-next-line */
        const pdf = new pdfKit;

        pdf.pipe(fs.createWriteStream(out));

        this.addLogo(pdf);
        this.addReceiverInformation(pdf);
        this.addContentToInfoBox(pdf);
        this.addHeading(pdf, this.invoiceId);
        this.addMessage(pdf);

        this.addInvoiceTable(pdf);
        this.drawMark(pdf, this.constrains.DOCUMENT_MARGIN_TOP_FOLD_MARK);
        this.drawMark(pdf, this.constrains.DOCUMENT_MARGIN_TOP_FOLD_MARK * 2);
        pdf.end();
        return pdf;
    }
    /**
    * @param {PDFKit.PDFDocument} pdf
    */
    addMessage(pdf) {
        pdf.text(this.message + '\n\n',
            this.constrains.TEXTFIELD_MARGIN_LEFT,
            this.constrains.TEXTFIELD_MARGIN_TOP + 40,
            {
                width: this.constrains.TEXTFIELD_WIDTH,
                align: 'justify',
            }
        );
    }
    /**
    * @param {PDFKit.PDFDocument} pdf
    */
    addLogo(pdf) {
        pdf.image(this.image, this.constrains.IMAGE_MARGIN_LEFT, 10, {
            fit: [this.constrains.IMAGE_WIDTH, this.constrains.IMAGE_HEIGHT],
            align: 'center',
            valign: 'center',
        });
    }
    /**
    * @param {PDFKit.PDFDocument} pdf
    */
    addHeading(pdf) {
        pdf.fontSize(20);
        pdf.text(this.language.Invoice + ' #' + this.invoiceId,
            this.constrains.TEXTFIELD_MARGIN_LEFT,
            this.constrains.TEXTFIELD_MARGIN_TOP);
        pdf.fontSize(12);
    }
    /**
    * @param {PDFKit.PDFDocument} pdf
    */
    addReceiverInformation(pdf) {
        pdf.fontSize(8).text(this.senderDetails.toString(true),
            this.constrains.ADRESS_MARGIN_LEFT,
            45 * this.constrains.MMTOPT);
        pdf.fontSize(12);
        pdf.text(this.receiverDetails.toString(false),
            this.constrains.ADRESS_MARGIN_LEFT, 62.7 * this.constrains.MMTOPT);
    }
    /**
   * @param {PDFKit} pdf
   */
    addContentToInfoBox(pdf) {
        pdf.text(this.infoblockData,
            this.constrains.INFO_BLOCK_MARGIN_RIGHT);
    }
    /**
    * @return {Object} obj
    * @return {number} obj.nettoSum
    * @return {number} obj.bruttoSum
    * @return {string} obj.currency
    */
    createTableFromPositions() {
        const tableModel = [];
        let nettoSum = 0; let bruttoSum = 0; let currency = '';
        for (let i = 0; i !== this.positions.length; i++) {
            const position = this.positions[i];
            nettoSum += position.cost;
            bruttoSum += position.cost * (1+position.Tax/100);
            currency = position.Currency;
            tableModel.push(
                {
                    pos: i+1,
                    quantity: position.Amount,
                    description: position.Description,
                    price: Position.numberWithCommas(position.Cost) +
                      ' ' + position.Currency,
                    tax: position.Tax + '%',
                }
            );
        }
        return {nettoSum, bruttoSum, currency, tableModel};
    }
    /**
    * adds the invoice table
    * @param {PDFKit.PDFDocument} pdf
    */
    addInvoiceTable(pdf) {
        const table = new PdfTable(pdf, {
        });
        table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
            column: 'description',
        })).setColumnsDefaults({headerBorder: '', align: 'right',
            padding: 10,
        }).addColumns(this.columns).onPageAdded((tb) => {
            tb.addHeader();
        });
        const {bruttoSum, nettoSum, currency, tableModel} =
            this.createTableFromPositions();
        tableModel.push({quantity: ' ', description: '', tax: '',
            price: ''});
        tableModel.push({quantity: '', description: '',
            tax: this.language.TotalNet,
            price: Position.numberWithCommas(nettoSum.toFixed(2)) +
            ' ' + currency});
        tableModel.push({quantity: '', description: '',
            tax: this.language.TotalGross,
            price: Position.numberWithCommas(bruttoSum.toFixed(2)) +
            ' ' + currency});
        table.addBody(tableModel);
    }
    /**
    * Created for drawing letter marks.
    * @param {PDFKit.PDFDocument} pdf
    * @param {number} y y-Coordinate of mark
    */
    drawMark(pdf, y) {
        pdf.moveTo(0, y);
        pdf.lineTo(10, y);
        pdf.stroke();
    }
};

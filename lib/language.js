module.exports = class Language {
    /**
     * @return {string} name of the language.
     */
    get Name() {
        return this.name;
    }
    /**
     * @return {string} amount.
     */
    get Amount() {
        return this.amount;
    }
    /**
     * @return {string} tax.
     */
    get Tax() {
        return this.tax;
    }
    /**
     * @return {string} invoice.
     */
    get Invoice() {
        return this.invoice;
    }
    /**
     * @return {string} price.
     */
    get Price() {
        return this.price;
    }
    /**
     * @return {string} description.
     */
    get Description() {
        return this.description;
    }
    /**
     * @return {string} position.
     */
    get Position() {
        return this.position;
    }
    /**
     * @return {string} gross.
     */
    get Gross() {
        return this.gross;
    }
    /**
     * @return {string} net.
     */
    get Net() {
        return this.net;
    }
    /**
     * @return {string} total net.
     */
    get TotalNet() {
        return this.totalNet;
    }
    /**
     * @return {string} total gross.
     */
    get TotalGross() {
        return this.totalGross;
    }
    /**
     * @return {string} short hand pos.
     */
    get ShortHandPos() {
        return this.shortHandPos;
    }
};

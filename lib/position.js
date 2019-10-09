
module.exports = class Position {
    /**
   * @param {Object} options
   * @param {number} options.amount
   * @param {string} options.description
   * @param {number} options.cost
   * @param {string} options.currency
   * @param {number} options.tax
  */
    constructor(options) {
        this.amount = options.amount;
        this.description = options.description;
        this.cost = options.cost;
        this.currency = options.currency;
        this.tax = options.tax;
    }
    /**
   * returns the amount of the item bought.
   */
    get Amount() {
        return this.amount;
    }
    /**
   * returns the description of the item.
   */
    get Description() {
        return this.description;
    }
    /**
   * returns the raw cost of the item without tax.
   */
    get Cost() {
        return this.cost.toFixed(2);
    }
    /**
   * returns the gross cost of the item including tax.
   */
    get Brutto() {
        return (this.cost * (1 + this.tax/100)).toFixed(2);
    }
    /**
   * returns the tax itself.
   * @example if the tax is 19% it will return 19
   */
    get Tax() {
        return this.tax;
    }
    /**
   * returns the currency symbol as string
   * @return {string}
   */
    get Currency() {
        return this.currency;
    }
    /**
   * @param {number} x
   * @return {string} formatter for numbers
   * @example 1000 => 1.000,00
   */
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

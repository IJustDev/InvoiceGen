
module.exports = class Position {
    
    /**
     * 
     * @param {number} amount 
     * @param {string} description 
     * @param {number} cost 
     * @param {number} tax 
     */
    constructor(amount, description, cost, tax, currency) {
        this.amount = amount;
        this.description = description;
        this.cost = cost;
        this.currency = currency;
        this.tax = tax;
    }

    get Amount() {
        return this.amount;
    }

    get Description() {
        return this.description;
    }

    get Cost() {
        return this.cost.toFixed(2);
    }

    get Brutto() {
        return (this.cost * (1 + this.tax/100)).toFixed(2);
    }
    
    get Tax() {
        return this.tax;
    }

    get Currency() {
        return this.currency;
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
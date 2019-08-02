module.expots = class Position {
    
    /**
     * 
     * @param {number} amount 
     * @param {string} description 
     * @param {number} cost 
     * @param {number} tax 
     */
    constructor(amount, description, cost, tax) {
        this.amount = amount;
        this.description = description;
        this.cost = cost;
        this.tax = tax;
    }

}
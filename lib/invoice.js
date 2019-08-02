module.exports = class Invoice {


    /**
     * 
     * @param {EntityDetails} receiverDetails 
     * @param {EntityDetails} senderDetails 
     * @param {Position[]} positions 
     */
    constructor(receiverDetails, senderDetails, positions) {
        this.receiverDetails = receiverDetails;
        this.senderDetails = senderDetails;
        this.positions = positions;
    }

}
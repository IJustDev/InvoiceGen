module.exports = class EntityDetails {
    /**
     * 
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} street 
     * @param {string} city 
     * @param {number} zipCode 
     */
    constructor(firstname, lastname, street, city, zipCode) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }

    /**
     * 
     * @param {string} iban 
     */
    addIBan(iban) {
        this.iban = iban;
    }

    /**
     * 
     * @param {string} email 
     */
    addEmail(email) {
        this.email = email;
    }

    /**
     * 
     * @param {string} phonenumber 
     */
    addPhonenumber(phonenumber) {
        this.phonenumber = phonenumber;
    }

    addCompanyName(name) {
        this.companyname = name;
    }

    get Firstname() {
        return this.firstname;
    }

    get LastName() {
        return this.lastname;
    }

    get Street() {
        return this.street;
    }

    get City() {
        return this.city;
    }

    get ZipCode() {
        return this.zipCode;
    }

    get IBan() {
        return this.iban;
    }

    get Email() {
        return this.email;
    }

    get Phonenumber() {
        return this.phonenumber;
    }

    toString(sender) {
        if (sender)
            return this.companyname + " " + this.street + " " + this.zipCode + " " + this.City; 
        return this.firstname + " " + this.lastname + "\n"
        + this.street + "\n"
        + this.zipCode + " " + this.city;
    }

}
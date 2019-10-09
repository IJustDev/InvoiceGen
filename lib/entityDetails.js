module.exports = class EntityDetails {
    /**
   * @param {Object} options
   * @param {string} options.firstname
   * @param {string} options.lastname
   * @param {string} options.street
   * @param {string} options.city
   * @param {string} options.zipCode
   */
    constructor(options) {
        this.firstname = options.firstname;
        this.lastname = options.lastname;
        this.street = options.street;
        this.city = options.city;
        this.zipCode = options.zipCode;
    }
    /**
   * @param {string} iban
   */
    addIBan(iban) {
        this.iban = iban;
    }
    /**
   * @param {string} email
   */
    addEmail(email) {
        this.email = email;
    }
    /**
   * @param {string} phonenumber
   */
    addPhonenumber(phonenumber) {
        this.phonenumber = phonenumber;
    }
    /**
   * Sets the name of the company.
   * @param {string} name
   */
    addCompanyName(name) {
        this.companyname = name;
    }
    /**
   * @return {string} the firstname.
   */
    get Firstname() {
        return this.firstname;
    }
    /**
   * @return {string} the lastname.
   */
    get LastName() {
        return this.lastname;
    }
    /**
   * @return {string} the street.
   */
    get Street() {
        return this.street;
    }
    /**
   * @return {string} the city.
   */
    get City() {
        return this.city;
    }
    /**
   * @return {string} the zipCode.
   */
    get ZipCode() {
        return this.zipCode;
    }
    /**
   * @return {string} the international bank account number.
   */
    get IBan() {
        return this.iban;
    }
    /**
   * @return {string} the email.
   */
    get Email() {
        return this.email;
    }
    /**
   * @return {string} the phonenumber.
   */
    get Phonenumber() {
        return this.phonenumber;
    }
    /**
   * @param {boolean} isSender
   * @return {string}
   */
    toString(isSender) {
        if (isSender) {
            return this.companyname + ' ' + this.street + ' ' +
        this.zipCode + ' ' + this.City;
        }
        return this.firstname + ' ' + this.lastname + '\n' +
        this.street + '\n' +
        this.zipCode + ' ' + this.city;
    }
};

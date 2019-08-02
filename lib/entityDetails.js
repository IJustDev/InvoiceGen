module.exports = class EntityDetails {

    constructor(firstname, lastname, street, city, zipCode) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
    }

    addIBan(iban) {
        this.iban = iban;
    }

}
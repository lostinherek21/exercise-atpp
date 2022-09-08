import { MinLengthValidator, Regexpvalidator } from "./Validator";
export class AddressValidation {
    constructor() {
        this.minLenValidator = new MinLengthValidator(5);
        this.regExpValidator = new Regexpvalidator(/^[0-9]{5}(?:-[0-9]{4})?$/g);
    }
    Validate(personDetail, errors) {
        if (!this.minLenValidator.isValid(personDetail.Address1)) {
            errors.push("address line one must be greater than 5 characters");
        }
        if (!this.minLenValidator.isValid(personDetail.Town)) {
            errors.push("town must be greater than 5 characters");
        }
        // if (!this.regExpValidator.isValid(personDetail.PostCode)) {
        //   errors.push("invalid postcode/zip code");
        // }
    }
}
export class NameValidation {
    constructor() {
        this.minLenValidator = new MinLengthValidator(1);
    }
    Validate(personDetail, errors) {
        if (!this.minLenValidator.isValid(personDetail.FirstName) &&
            !this.minLenValidator.isValid(personDetail.LastName)) {
            errors.push("first name or last name is empty");
        }
    }
}
export class PhoneNumberValidation {
    constructor() {
        this.regExpValidator = new Regexpvalidator(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/g);
        this.minLenValidator = new MinLengthValidator(1);
    }
    Validate(personDetail, errors) {
        if (!this.minLenValidator.isValid(personDetail.PhoneNumber)) {
            errors.push("phone number is empty");
        }
        // else if (!this.regExpValidator.isValid(personDetail.PhoneNumber)) {
        //   errors.push("phone number is not valid");
        // }
    }
}
//# sourceMappingURL=Validations.js.map
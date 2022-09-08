export class MinLengthValidator {
    constructor(minLength) {
        this.minLength = minLength;
    }
    isValid(input) {
        if (!input) {
            return false;
        }
        return input.length > this.minLength;
    }
}
export class Regexpvalidator {
    constructor(regExp) {
        this.regExp = regExp;
    }
    isValid(input) {
        if (!input) {
            return false;
        }
        return this.regExp.test(input);
    }
}
//# sourceMappingURL=Validator.js.map
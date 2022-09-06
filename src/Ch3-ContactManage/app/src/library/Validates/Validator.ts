import { StringOrNull } from "../../Types/Common";

export interface IValidator<T> {
  isValid(input: T): boolean;
}

export class MinLengthValidator implements IValidator<StringOrNull> {
  constructor(private minLength: number) {}
  isValid(input: StringOrNull): boolean {
    if (!input) {
      return false;
    }

    return input.length > this.minLength;
  }
}

export class Regexpvalidator implements IValidator<StringOrNull> {
  constructor(private regExp:RegExp) {}
  isValid(input: StringOrNull): boolean {
    if(!input) {
      return false
    }

    return this.regExp.test(input)
  }
}

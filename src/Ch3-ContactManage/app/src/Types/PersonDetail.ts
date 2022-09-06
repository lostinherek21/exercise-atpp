import { StringOrNull } from "./Common";

export default interface IPersonDetail {
  Address1: StringOrNull;
  Address2: StringOrNull;
  Country: StringOrNull;
  DateOfBirth: StringOrNull;
  FirstName: string;
  LastName: string;
  PersonId: string;
  PhoneNumber: string;
  PostCode: string;
  Town: string;
}

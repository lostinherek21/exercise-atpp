import { useState } from "react";
import IPersonDetail from "../Types/PersonDetail";

export const DefaultPersonDefail: IPersonDetail = {
  Address1: "",
  Address2: null,
  Country: "",
  DateOfBirth: new Date().toString().substring(0, 10),
  FirstName: "",
  LastName: "",
  PersonId: "",
  PhoneNumber: "",
  PostCode: "",
  Town: "",
};

export default function usePersonDetails(
  defaultDetail: IPersonDetail = DefaultPersonDefail
) {
  const [personDetailState, setPersonDetail] = useState(defaultDetail);

  return {
    personDetail: personDetailState,
    setPersonState<T>(field: string, value: T) {
      setPersonDetail({ ...personDetailState, [field]: value });
    },
    setPersonStateFull(state: IPersonDetail) {
      setPersonDetail(state)
    },
    setDefaultState(){
      setPersonDetail(DefaultPersonDefail)
    }
  };
}

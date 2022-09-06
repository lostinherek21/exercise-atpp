import React, { FunctionComponent } from "react";
import usePersonDetails from "../hooks/PersonDetailState";
import IPersonDetail from "../Types/PersonDetail";
import CustomInput from "./CustomInput";

import "./PersonDetail.scss";

export interface IPersonDetailComponent {
  personDetail: IPersonDetail;
  setPersonState: (field: string, value: any) => void;
}

const PersonDetail: FunctionComponent<IPersonDetailComponent> = ({
  personDetail,
  setPersonState,
}) => {
  return (
    <div className="person-detail">
      <h1>Personal Details</h1>

      <div className="person-name muilt-input">
        <CustomInput
          id="firstName"
          label="First name"
          onChange={(e) => setPersonState("FirstName", e.target.value)}
          inputValue={personDetail.FirstName}
        />
        <CustomInput
          id="lastName"
          label="Last name"
          onChange={(e) => setPersonState("LastName", e.target.value)}
          inputValue={personDetail.LastName}
        />
      </div>

      <CustomInput
        id="addressOne"
        label="Address Line 1"
        onChange={(e) => setPersonState("Address1", e.target.value)}
        inputValue={personDetail.Address1}
      />
      <CustomInput
        id="addressTwo"
        label="Address Line 2"
        onChange={(e) => setPersonState("Address2", e.target.value)}
        inputValue={personDetail.Address2}
      />
      <CustomInput
        id="town"
        label="Town"
        onChange={(e) => setPersonState("Town", e.target.value)}
        inputValue={personDetail.Town}
      />
      <CustomInput
        id="country"
        label="Country"
        onChange={(e) => setPersonState("Country", e.target.value)}
        inputValue={personDetail.Country}
      />

      <div className="person-numbers muilt-input">
        <CustomInput
          id="postalOrZipCode"
          label="Postal/Zip Code"
          onChange={(e) => setPersonState("PostCode", e.target.value)}
          inputValue={personDetail.PostCode}
        />
        <CustomInput
          id="phone"
          label="Phone number"
          onChange={(e) => setPersonState("PhoneNumber", e.target.value)}
          inputValue={personDetail.PhoneNumber}
        />
      </div>

      <CustomInput
        id="DateOfBirth"
        label="Date of Birth"
        type="date"
        onChange={(e) => setPersonState("DateOfBirth", e.target.value)}
        inputValue={personDetail.DateOfBirth}
      />
    </div>
  );
};

export default PersonDetail;

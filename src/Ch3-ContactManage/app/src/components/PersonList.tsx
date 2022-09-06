import React, { FunctionComponent } from "react";
import IPersonDetail from "./../Types/PersonDetail";

import "./PersonList.scss"

export interface IPersonList {
  personList: IPersonDetail[];
}

const PersonList: FunctionComponent<IPersonList> = ({ personList }) => {
  return (
    <div className="person-list">
      <h1>Person List</h1>
      <ul>
        {personList.map((detail) => {
          return <li key={detail.PersonId}>{detail.FirstName}</li>
        })}
      </ul>
    </div>
  );
};

export default PersonList;

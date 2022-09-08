import React from "react";
import "./PersonList.scss";
const PersonList = ({ personList }) => {
    return (<div className="person-list">
      <h1>Person List</h1>
      <ul>
        {personList.map((detail) => {
            return <li key={detail.PersonId}>{detail.FirstName}</li>;
        })}
      </ul>
    </div>);
};
export default PersonList;
//# sourceMappingURL=PersonList.js.map
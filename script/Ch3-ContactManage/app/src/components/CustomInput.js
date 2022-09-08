import React from "react";
import "./CustomInput.scss";
const CustomInput = ({ id, label, onChange, inputValue, type = "text" }) => {
    return (<div className="custom-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={inputValue ? inputValue : ""} onChange={onChange}/>
    </div>);
};
export default CustomInput;
//# sourceMappingURL=CustomInput.js.map
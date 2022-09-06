import React, { ChangeEventHandler, FunctionComponent } from "react";
import { StringOrNull } from "../Types/Common";

import "./CustomInput.scss";

export interface ICustomInput {
  id: string;
  label: string;
  inputValue?: StringOrNull;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string
}

const CustomInput: FunctionComponent<ICustomInput> = ({
  id,
  label,
  onChange,
  inputValue,
  type="text"
}) => {
  return (
    <div className="custom-input">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={inputValue ? inputValue : ""} onChange={onChange} />
    </div>
  );
};

export default CustomInput;

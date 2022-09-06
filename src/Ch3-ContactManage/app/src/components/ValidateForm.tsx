import IPersonDetail from "../Types/PersonDetail";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  AddressValidation,
  NameValidation,
  PersonValidation,
  PhoneNumberValidation,
} from "./../library/Validates/Validations";

import "./ValidateForm.scss"

export interface IFormValidation {
  CurrentState: IPersonDetail;
  CanSave: (cansave: boolean) => void;
}

const FormValidation: FunctionComponent<IFormValidation> = ({
  CurrentState,
  CanSave,
}) => {
  const [errors, setErrors] = useState<string[]>();
  const validations = useMemo<PersonValidation[]>(() => {
    return [
      new PhoneNumberValidation(),
      new NameValidation(),
      new AddressValidation(),
    ];
  }, []);

  // validating
  useEffect(() => {
    const localErrors: string[] = [];
    validations.forEach((validation) =>
      validation.Validate(CurrentState, localErrors)
    );

    setErrors(localErrors);
    CanSave(localErrors.length === 0);
  }, [CurrentState]);

  return (
    <div className="form-validation">
      {errors?.map((errorMsg, index) => {
        return (
          <span key={index} className="error-message">
            {errorMsg}
          </span>
        );
      })}
    </div>
  );
};

export default FormValidation;

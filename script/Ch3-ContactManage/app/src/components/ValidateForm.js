import { useEffect, useMemo, useState } from "react";
import { AddressValidation, NameValidation, PhoneNumberValidation, } from "./../library/Validates/Validations";
import "./ValidateForm.scss";
const FormValidation = ({ CurrentState, CanSave, }) => {
    const [errors, setErrors] = useState();
    const validations = useMemo(() => {
        return [
            new PhoneNumberValidation(),
            new NameValidation(),
            new AddressValidation(),
        ];
    }, []);
    // validating
    useEffect(() => {
        const localErrors = [];
        validations.forEach((validation) => validation.Validate(CurrentState, localErrors));
        setErrors(localErrors);
        CanSave(localErrors.length === 0);
    }, [CurrentState]);
    return (<div className="form-validation">
      {errors === null || errors === void 0 ? void 0 : errors.map((errorMsg, index) => {
            return (<span key={index} className="error-message">
            {errorMsg}
          </span>);
        })}
    </div>);
};
export default FormValidation;
//# sourceMappingURL=ValidateForm.js.map
import { useState } from "react";
export const DefaultPersonDefail = {
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
export default function usePersonDetails(defaultDetail = DefaultPersonDefail) {
    const [personDetailState, setPersonDetail] = useState(defaultDetail);
    return {
        personDetail: personDetailState,
        setPersonState(field, value) {
            setPersonDetail(Object.assign(Object.assign({}, personDetailState), { [field]: value }));
        },
        setPersonStateFull(state) {
            setPersonDetail(state);
        },
        setDefaultState() {
            setPersonDetail(DefaultPersonDefail);
        }
    };
}
//# sourceMappingURL=PersonDetailState.js.map
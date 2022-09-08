import React, { useCallback, useEffect, useMemo, useState } from "react";
import ClearButton from "../components/ClearButton";
import PersonDetail from "../components/PersonDetail";
import PersonList from "../components/PersonList";
import SaveButton from "../components/SaveButton";
import usePersonDetails from "../hooks/PersonDetailState";
import DataBase from "../library/db/Database";
import "./index.scss";
import PersonDetailTableBuilder from "./../library/db/PersonDetailTableBuilder";
import FormValidation from "../components/ValidateForm";
let cnt = 0;
const Person = () => {
    //current person state
    const { personDetail: currentPersonState, setPersonState, setDefaultState, } = usePersonDetails();
    //person list state
    const [personList, setPersonList] = useState([]);
    //load list
    const [isLoadPersonList, setLoadList] = useState(false);
    useEffect(() => {
        dataLayout.Read().then((persons) => {
            if (persons) {
                setPersonList(persons);
            }
        });
    }, [isLoadPersonList]);
    const dataLayout = useMemo(() => {
        return new DataBase(new PersonDetailTableBuilder().Build());
    }, []);
    const onClearClick = useCallback(() => {
        setDefaultState();
    }, []);
    //save form
    const [canSave, setCanSave] = useState(false);
    const canSaveCallback = useCallback((canSave) => {
        setCanSave(canSave);
    }, []);
    const onSaveClick = useCallback(() => {
        if (canSave) {
            dataLayout.Create(Object.assign(Object.assign({}, currentPersonState), { isActive: true, PersonId: new Date().toString() }));
            setLoadList(!isLoadPersonList);
        }
    }, [currentPersonState]);
    return (<div className="main-container">
      <main>
        <PersonDetail personDetail={currentPersonState} setPersonState={setPersonState}/>
        <PersonList personList={personList}/>
      </main>
      <div className="buttons">
        <SaveButton onSaveClick={onSaveClick}/>
        <ClearButton onClearClick={onClearClick}/>
      </div>

      <FormValidation CurrentState={currentPersonState} CanSave={canSaveCallback}/>
    </div>);
};
export default Person;
//# sourceMappingURL=index.js.map
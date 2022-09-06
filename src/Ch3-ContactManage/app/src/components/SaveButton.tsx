import { Button } from "@blueprintjs/core";
import React from "react";
import IPersonDetail from "./../Types/PersonDetail";
import { useCallback, FunctionComponent } from "react";

export interface ISaveButton {
  onSaveClick: (e: React.MouseEvent) => void;
}

const SaveButton: FunctionComponent<ISaveButton> = ({
  onSaveClick,
}) => {
  return <Button intent="danger" text={"Save"} onClick={onSaveClick} />;
};

export default SaveButton;

import { Button } from '@blueprintjs/core'
import React from 'react'
import { FunctionComponent } from 'react';

export interface IClearButton {
  onClearClick: (e:React.MouseEvent) => void
}

const ClearButton:FunctionComponent<IClearButton> = ({onClearClick}) => {
  return (
    <Button onClick={onClearClick} icon="refresh">
      Clear
    </Button>
  )
}

export default ClearButton
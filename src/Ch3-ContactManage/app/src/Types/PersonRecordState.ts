
import IPersonDetail from './PersonDetail';

export interface IRecordState {
  isActive:boolean
}

export type PersonRecordState = IPersonDetail & IRecordState
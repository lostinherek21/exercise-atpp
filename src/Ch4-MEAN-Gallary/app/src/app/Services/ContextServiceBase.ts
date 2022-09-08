import {BehaviorSubject} from 'rxjs'
import { IPictureModule } from './file-preview-service.service';

export default class ContextServiceBase {
  private source = new BehaviorSubject<IPictureModule | undefined>(undefined)
  public context = this.source.asObservable()

  public add(image:IPictureModule){
    this.source.next(image)
  }
}

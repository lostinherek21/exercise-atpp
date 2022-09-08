import { Component, OnInit } from '@angular/core';
import { AddImageService } from './../../Services/add-image.service';
import { LoadImageService } from './../../Services/load-image.service';
import { DataTransferService } from './../../Services/data-transfer.service';
import { IPictureModule } from './../../Services/file-preview-service.service';

@Component({
  selector: 'atp-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.scss'],
})
export class PageBodyComponent implements OnInit {
  public Pictures: IPictureModule[] = []
  constructor(
    private addImage: AddImageService,
    private loadImage: LoadImageService,
    private transfer: DataTransferService
  ) {}

  ngOnInit(): void {
    this.transfer.Initailze()

    this.loadImage.context.subscribe(message => {
      if(message) {
        this.Pictures.push(message)
      }
    })

    this.addImage.context.subscribe(message => {
      if(message) {
        this.Pictures.push(message)
      }
    })
  }
}

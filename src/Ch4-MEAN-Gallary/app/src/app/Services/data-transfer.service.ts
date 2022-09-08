import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddImageService } from './add-image.service';
import { LoadImageService } from './load-image.service';
import { IPictureModule } from './file-preview-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  constructor(
    private client: HttpClient,
    private addImage: AddImageService,
    private loadImage: LoadImageService
  ) {}

  Initailze() {
    this.LoadImageToSubscriber();
    this.SubscribeToAddImage();
  }

  private SubscribeToAddImage() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.addImage.context.subscribe((message) => {
      if (!message) {
        return;
      }

      this.client
        .post('http://localhost:3000/add', message, httpOptions)
        .subscribe((cb) => {});
    });
  }

  private LoadImageToSubscriber() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    this.client
      .get<string[]>('http://localhost:3000/get', httpOptions)
      .subscribe((pics) => {
        if (!Array.isArray(pics)) return;
        pics.forEach((pic) => {
          this.client
            .get<IPictureModule>(`http://localhost:3000/id/${pic}`)
            .subscribe((pic) => {
              if (pic) {
                this.loadImage.add(pic);
              }
            });
        });
      });
  }
}

import { Injectable } from '@angular/core';

export interface IPictureModule {
  Image: string;
  Name: string;
  Description: string;
  tags: string;
}

export class PictureModule implements IPictureModule {
  public Image: string = '';
  public Name: string = '';
  public Description: string = '';
  public tags: string = "";
}

@Injectable({
  providedIn: 'root',
})
export class FilePreviewServiceService {
  constructor() {}

  Preview(files: any): Promise<PictureModule> {
    return new Promise((resolve, reject) => {
      if (files.length === 0) {
        return;
      }
      const file = files[0];
      if (file.type.match(/image\/*/) === null) {
        reject('the file is not a image');
        return;
      }

      const imageModule = new PictureModule();
      imageModule.Name = file.name;

      const reader = new FileReader();
      reader.onload = (ev) => {
        imageModule.Image = reader.result?.toString() || '';
        resolve(imageModule);
      };
      reader.readAsDataURL(file);
    });
  }
}

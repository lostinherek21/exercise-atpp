import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FilePreviewServiceService } from 'src/app/Services/file-preview-service.service';
import { IPictureModule } from './../../Services/file-preview-service.service';
@Component({
  selector: 'atp-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss'],
})
export class FileuploadComponent implements OnInit {
  protected imageSource: IPictureModule | undefined = undefined;
  protected message: any;
  protected description: string = '';
  protected tags: string = ""

  constructor(
    private dialog: MatDialogRef<FileuploadComponent>,
    private preview: FilePreviewServiceService
  ) {}

  ngOnInit(): void {}

  public OnImageSelected(files: any): void {
    this.preview
      .Preview(files)
      .then((result) => {
        this.imageSource = result;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public Save(): void {
    if (this.imageSource) {
      this.imageSource.Description = this.description;
      this.imageSource.tags = this.tags;
      this.dialog.close(this.imageSource);
    }
  }

  public onTagsKeyup(ev: any) {
    this.tags = ev.target.value
  }

  public onDescriptionKeyup(ev:any) {
    this.description = ev.target.value
  }
}

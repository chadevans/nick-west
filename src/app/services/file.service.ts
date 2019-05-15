import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private transfer: FileTransfer, private file: File)
  { }

  async downloadImage(url: string): Promise<void> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    const entry: FileEntry = await fileTransfer.download(url, this.file.dataDirectory + 'file.jpg');
    // console.log('file saved:',entry.toURL());
  }

  async loadLocalImage(): Promise<string> {
    return await this.file.readAsDataURL(this.file.dataDirectory, 'file.jpg');
  }
}
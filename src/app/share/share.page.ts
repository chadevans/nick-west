import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FileService } from '../services/file.service';
import * as html2canvas from 'html2canvas';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  quote: string;
  imageSrc: string;
  textColor: string;

  shareOpen: boolean = false;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public file: FileService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.quote = this.navParams.data.quote;
    this.imageSrc = this.navParams.data.imageSrc;
    this.textColor = this.navParams.data.textColor;
    this.loadLocalImage();
  }

  async loadLocalImage(): Promise<void> {
    this.imageSrc = await this.file.loadLocalImage();
  }

  async shareImage(): Promise<void> {
    if (this.shareOpen === false) {
      const canvas: HTMLCanvasElement = await this.buildCanvas();
      const imageShare: string = await this.convertCanvasToImage(canvas);
      console.log('image share',imageShare);
      this.shareOpen = true;
      this.socialSharing.shareWithOptions({
        files: [imageShare]
      }).then(() => {
        this.shareOpen = false;
        this.closeModal();
      })
    }
  }

  async buildCanvas(): Promise<HTMLCanvasElement> {
    const element: HTMLElement = document.getElementById("canvas");
    return await html2canvas(element);
  }

  async convertCanvasToImage(canvas: HTMLCanvasElement): Promise<string> {
    return canvas.toDataURL("image/jpg");
  }

  async closeModal(): Promise<void> {
    await this.modalController.dismiss();
  }

}

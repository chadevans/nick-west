import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import * as html2canvas from 'html2canvas';

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
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.quote = this.navParams.data.quote;
    this.imageSrc = this.navParams.data.imageSrc;
    this.textColor = this.navParams.data.textColor;
  }

  async shareImage(): Promise<void> {
    if (this.shareOpen === false) {
      const canvas: HTMLCanvasElement = await this.buildCanvas();
      const imageShare: string = await this.convertCanvasToImage(canvas);
      console.log('image share',imageShare);
      this.shareOpen = true;
      await this.socialSharing.shareWithOptions({ files: [imageShare] });
      this.shareOpen = false;
      this.closeModal();
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

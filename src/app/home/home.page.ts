import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SharePage } from '../share/share.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  initial: boolean = true;
  initialMessage: string = "Nick West"
  initialDescription: string = "Combine images of Nick Cage with Kanye West quotes"
  loading: any;

  quote: string = '';
  quoteNext: string = '';
  imageSrc: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
  textColor: string = '#000';
  textColorNext: string = '';

  constructor(
    public api: ApiService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {}

  async refresh(type?: string): Promise<void> {
    await this.presentLoadingScreen();
    [ this.quoteNext, this.imageSrc, this.textColorNext ] = await Promise.all([
      this.api.getKanyeQuote(),
      this.api.getNickCageImage(type),
      this.api.getTextColor(0)
    ]);
  }

  async presentLoadingScreen(): Promise<void> {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      cssClass: 'custom-class custom-loading'
    });
    await this.loading.present();
  }

  async dismissLoadingScreen(): Promise<void> {
    this.initial = false;
    await this.loading.dismiss();
  }

  async imageLoaded(): Promise<void> {
    if (this.loading) {
      this.quote = this.quoteNext;
      this.textColor = this.textColorNext;
      await this.dismissLoadingScreen();
    }
  }

  async presentModal(): Promise<any> {
    if (!this.initial) {
      const modal = await this.modalCtrl.create({
        component: SharePage,
        componentProps: { "imageSrc": this.imageSrc, "quote": this.quote, "textColor": this.textColor }
      });
      return await modal.present();
    }
  }

}

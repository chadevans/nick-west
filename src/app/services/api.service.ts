import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HTTP, public file: FileService) { }

  async getNickCageImage(type: string): Promise<string> {
    // placecage.com api
    // example: http://www.placecage.com/600/400
    // crazy version: http://www.placecage.com/c/600/400
    const api: string = "http://www.placecage.com";
    const crazy: string = "c";
    const gif: string = "gif";

    const max: number = 90;
    const min: number = 40;
    const random: number = Math.random() * (max - min) + min;
    const int: number = Math.round(random) * 10;

    let url: string;

    switch(type) {
      case 'crazy':
        url = `${api}/${crazy}/${int}/${int}`;
        break;
      case 'gif':
        url = `${api}/${gif}/${int}/${int}`;
        break;
      default:
        url = `${api}/${int}/${int}`;
    }

    await this.file.downloadImage(url);
    return await this.file.loadLocalImage();
  }

  async getKanyeQuote(): Promise<string> {
    try {
      const api: string = 'https://api.kanye.rest';
      const response: any = await this.http.get(api,{},{});
      const responseData: any = JSON.parse(response.data);
      const quote: string = responseData.quote;
      return quote;
    } catch (error) {
      console.error(error);
      return 'no kanye quote available';
    }
  }

  async getTextColor(brightness: number): Promise<string> {
    // found on stack overflow
    // Six levels of brightness from 0 to 5, 0 being the darkest
    const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    const mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
  }
}
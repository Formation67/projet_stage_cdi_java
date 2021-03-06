import { Injectable } from "@angular/core";
import {Headers, Http, Response} from "@angular/http";

import { AuthProvider } from '../providers/auth';
import { Image } from '../models/image.model';

import config from "../assets/config/config";

import 'rxjs/add/operator/map';

@Injectable()
export class ImgService {
    url: string = config.backImgServerAddress + "/dadakar/img/";
    private header: Headers;

    constructor(private authProvider: AuthProvider, private http:Http) {
        this.authProvider.authUser.subscribe(jwt => {
            if(jwt) {
                this.header = new Headers({
                    'Authorization': jwt.token
                });
            }
        });
    }

    add(image: Image) {
        return this.http.post(this.url + "ionicupload", image, {headers : this.header}).map((res: Response) => res.text());
    }

    delete(fileName: string) {
        return this.http.delete(this.url + "del/" + fileName, {headers: this.header});
    }

    findById(imageId: string) {
        return this.http.get(this.url + imageId, {headers : this.header}).map((res: Response) => res.text());
    }

    findByFileName(fileName: string) {
        return this.http.get(this.url + "ionic/name:" + fileName, {headers : this.header}).map((res: Response) => res.text());
    }

}

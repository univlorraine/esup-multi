import { Injectable } from '@angular/core';
import infosJsonData from './infos.json';

@Injectable({
    providedIn: 'root'
})
export class InfosService {
    getAppVersion() {
        return infosJsonData.version;
    }
}


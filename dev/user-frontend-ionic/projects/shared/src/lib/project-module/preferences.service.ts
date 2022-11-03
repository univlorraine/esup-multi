import { Injectable } from '@angular/core';
import { Type } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    private preferencesComponents: Type<any>[] = [];

    public addPreferencesComponent(preferencesComponent: Type<any>) {
        this.preferencesComponents.push(preferencesComponent);
    }

    public getPreferencesComponents() {
        return this.preferencesComponents;
    }

}

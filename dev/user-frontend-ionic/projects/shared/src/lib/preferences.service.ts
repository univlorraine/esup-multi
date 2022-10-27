import { Injectable } from '@angular/core';
import { Type } from '@angular/core';

export interface PreferencesComponent {
    component: Type<any>;
}

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    private preferencesComponents: PreferencesComponent[] = [];

    public addPreferencesComponent(preferencesComponent: PreferencesComponent) {
        this.preferencesComponents.push(preferencesComponent);
    }

    public getPreferencesComponents() {
        return this.preferencesComponents;
    }

}

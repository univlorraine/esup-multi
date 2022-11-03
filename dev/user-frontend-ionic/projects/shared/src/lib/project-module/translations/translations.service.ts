import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TranslationsService {

    private translations: string[] = [];

    public addTranslation(translation: string) {
        this.translations.push(translation);
    }

    public getTranslations() {
        return this.translations;
    }

}

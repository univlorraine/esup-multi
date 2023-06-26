import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'date-fns';
import * as locale from 'date-fns/locale';

@Pipe({
    name: 'shortenedDate',
    pure: false
})
export class ShortenedDatePipe implements PipeTransform {

    constructor(private translateService: TranslateService) { }

    transform(fullDate: string): string {
      const lang = this.translateService.currentLang || this.translateService.defaultLang;
      return format(new Date(fullDate), 'P', {locale: locale[lang]});
    }
}

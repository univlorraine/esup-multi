import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { formatDistanceToNow } from 'date-fns';
import * as locale from 'date-fns/locale';

@Pipe({
    name: 'relativeTime',
    pure: false
})

export class RelativeTimePipe implements PipeTransform {

    constructor(private translateService: TranslateService) {}

    transform(inputDate: Date): string {
        const lang = this.translateService.currentLang || this.translateService.defaultLang;
        return formatDistanceToNow(inputDate, { locale: locale[lang] });
    }
}

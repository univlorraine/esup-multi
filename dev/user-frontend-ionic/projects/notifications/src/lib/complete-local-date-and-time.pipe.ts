import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format, parseISO } from 'date-fns';
import * as locale from 'date-fns/locale';


@Pipe({
    name: 'completeLocalDateAndTime',
    pure: false
})
export class CompleteLocalDateAndTimePipe implements PipeTransform {

    constructor(private translateService: TranslateService) { }

    transform(isoDate: string): string {
        const lang = this.translateService.currentLang || this.translateService.defaultLang;

        let transformedDate = format(parseISO(isoDate), 'PPPPp',
            { locale: locale[lang] }
        );

        transformedDate = transformedDate.charAt(0).toUpperCase() + transformedDate.slice(1);

        return transformedDate;
    }
}

import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[appRssItemHeaderButton]' })
export class RssItemHeaderButtonDirective {
  constructor(public template: TemplateRef<any>) { }
}

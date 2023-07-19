import Step from 'shepherd.js/src/types/step';
import { Router } from '@angular/router';
import { TranslateService}  from '@ngx-translate/core';

export const anonymousSteps= (router: Router, translateService: TranslateService, onComplete?: () => void): Step.StepOptions[] => [
  {
    id: 'anonymous-step-10',
    text: translateService.instant('GUIDED_TOUR.ANONYMOUS.STEP_10.MESSAGE'),
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: translateService.instant('GUIDED_TOUR.CLOSE'),
        action() {
          onComplete();
          return this.complete();
        }
      },
      {
        classes: 'shepherd-button-primary',
        text: translateService.instant('GUIDED_TOUR.NEXT'),
        action() {
          this.next();
        }
      }
    ],
  },
  {
    id: 'anonymous-step-20',
    attachTo: {
      element: '[data-menu-id="main-tab-bar"]',
      on: 'top'
    },
    text: translateService.instant('GUIDED_TOUR.ANONYMOUS.STEP_20.MESSAGE'),
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: translateService.instant('GUIDED_TOUR.CLOSE'),
        action() {
          onComplete();
          return this.complete();
        }
      },
      {
        classes: 'shepherd-button-primary',
        text: translateService.instant('GUIDED_TOUR.NEXT'),
        action() {
          this.next();
        }
      }
    ]
  },
  {
    id: 'anonymous-step-30',
    attachTo: {
      element: '[data-widget-id="auth:auth-not-authentified-widget"]',
      on: 'bottom'
    },
    text: translateService.instant('GUIDED_TOUR.ANONYMOUS.STEP_30.MESSAGE'),
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: translateService.instant('GUIDED_TOUR.FINISH'),
        action() {
          onComplete();
          return this.complete();
        }
      }
    ]
  }
];

import Step from 'shepherd.js/src/types/step';
import { Router } from '@angular/router';
import { TranslateService }  from '@ngx-translate/core';

export const loggedSteps= (router: Router, translateService: TranslateService, onComplete?: () => void): Step.StepOptions[] => [
  {
    id: 'logged-step-10',
    text: translateService.instant('GUIDED_TOUR.LOGGED.STEP_10.MESSAGE'),
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
    id: 'logged-step-20',
    attachTo: {
      element: '[data-menu-id="features-widgets"]',
      on: 'top-start'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_20.MESSAGE')}
            <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-20.png">`,
  },
  {
    id: 'logged-step-30',
    attachTo: {
      element: '[data-menu-id="notifications"]',
      on: 'bottom'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_30.MESSAGE')}
          <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-30.png">`,
  },
  {
    id: 'logged-step-40',
    attachTo: {
      element: '[data-menu-id="rss"]',
      on: 'bottom'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_40.MESSAGE')}`,
  },
  {
    id: 'logged-step-50',
    attachTo: {
      element: '[data-menu-id="features-services"]',
      on: 'top-end'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_50.MESSAGE')}`,
  },
  {
    id: 'logged-step-60',
    beforeShowPromise: () => router.navigate(['/features/services']),
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_60.MESSAGE')}
        <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-60.png">`,
  },
  {
    id: 'logged-step-70',
    attachTo: {
      element: '[data-service-id="searchbar"]',
      on: 'bottom'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_70.MESSAGE')}`,
  },
  {
    id: 'logged-step-80',
    attachTo: {
      element: '[data-menu-id="cards"]',
      on: 'top'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_80.MESSAGE')}
        <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-80.png">`,
  },
  {
    id: 'logged-step-90',
    attachTo: {
      element: '[data-menu-id="chatbot"]',
      on: 'top-start'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_90.MESSAGE')}
        <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-90.png">`,
  },
  {
    id: 'logged-step-100',
    attachTo: {
      element: '[data-menu-id="menu"]',
      on: 'top-start'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_100.MESSAGE')}
        <br/> <img class="shepherd-image" src="assets/guided-tour/logged-guided-tour-step-100.png">`,
  },
  {
    id: 'logged-step-110',
    beforeShowPromise: () => router.navigate(['/menu']),
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_110.MESSAGE')}`,
  },
  {
    id: 'logged-step-120',
    attachTo: {
      element: '[data-burger-id="menu-footer"]',
      on: 'top'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_120.MESSAGE')}`,
  },
  {
    id: 'logged-step-130',
    attachTo: {
      element: '[data-burger-id="preferences-menu"]',
      on: 'top'
    },
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
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_130.MESSAGE')}`,
  },
  {
    id: 'logged-step-140',
    attachTo: {
      element: '[data-burger-id="menu-help"]',
      on: 'top'
    },
    buttons: [
      {
        classes: 'shepherd-button-primary',
        text: translateService.instant('GUIDED_TOUR.FINISH'),
        action() {
          onComplete();
          return this.complete();
        }
      }
    ],
    text: `${translateService.instant('GUIDED_TOUR.LOGGED.STEP_140.MESSAGE')}`,
  },
];

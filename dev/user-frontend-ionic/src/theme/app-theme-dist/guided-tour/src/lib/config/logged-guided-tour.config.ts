/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

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
        <br/> <img class="shepherd-image" src="theme/app-theme/assets/guided-tour/logged-guided-tour-step-90.png">`,
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

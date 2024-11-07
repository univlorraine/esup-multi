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

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component, DestroyRef,
  EventEmitter, inject,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectModuleService } from '../../project-module/project-module.service';
import { WidgetLifecycleService } from './widget-lifecycle.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['../../../../../../src/theme/app-theme/styles/shared/widget.component.scss'],
})
export class WidgetComponent implements AfterViewInit {
  @Input() widgetId: string;
  @Input() widgetColor: string;
  @ViewChild('widget', { read: ViewContainerRef }) widgetContainerRef: ViewContainerRef;
  @Output() widgetIsEmpty = new EventEmitter<boolean>();

  private destroyRef = inject(DestroyRef);

  constructor(
    private projectModuleService: ProjectModuleService,
    private cdr: ChangeDetectorRef,
    private widgetLifecycleService: WidgetLifecycleService
  ) { }

  async ngAfterViewInit() {
    this.widgetContainerRef.clear();
    const componentToCreate = this.projectModuleService.getWidgetComponent(this.widgetId);
    if (componentToCreate) {
      const widgetInstance = this.widgetContainerRef.createComponent(componentToCreate).instance;
      this.handleWidgetLifecycle(widgetInstance);

      widgetInstance.widgetColor = this.widgetColor;
      if (widgetInstance.isEmpty$) {
        widgetInstance.isEmpty$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((isEmpty: boolean) => {
            this.widgetIsEmpty.emit(isEmpty);
          });
      }

      this.cdr.detectChanges();
    } else {
      console.warn(`'${this.widgetId}' is not found`);
    }
  }

  private handleWidgetLifecycle(widgetInstance: any) {
    if (widgetInstance.widgetViewWillEnter && typeof widgetInstance.widgetViewWillEnter === 'function') {
      this.widgetLifecycleService.widgetViewWillEnter(this.widgetId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => widgetInstance.widgetViewWillEnter());
    }
    if (widgetInstance.widgetViewDidEnter && typeof widgetInstance.widgetViewDidEnter === 'function') {
      this.widgetLifecycleService.widgetViewDidEnter(this.widgetId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => widgetInstance.widgetViewDidEnter());
    }
    if (widgetInstance.widgetViewWillLeave && typeof widgetInstance.widgetViewWillLeave === 'function') {
      this.widgetLifecycleService.widgetViewWillLeave(this.widgetId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => widgetInstance.widgetViewWillLeave());
    }
    if (widgetInstance.widgetViewDidLeave && typeof widgetInstance.widgetViewDidLeave === 'function') {
      this.widgetLifecycleService.widgetViewDidLeave(this.widgetId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => widgetInstance.widgetViewDidLeave());
    }
  }
}

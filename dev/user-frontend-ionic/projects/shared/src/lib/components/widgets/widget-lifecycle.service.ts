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

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

/**
 * To use the widget lifecycle events in your widget, you will just need to implement any of the following methods in
 * it, those methods will be triggered by the parent component WidgetComponent:
 * - widgetViewWillEnter(void)
 * - widgetViewDidEnter(void)
 * - widgetViewWillLeave(void)
 * - widgetViewDidLeave(void)
 *
 * [NOTE] We need MULTI-258 to be fixed before some of the widgets can use that, if the widget is instanced two times
 * on the same page only the methods of the first instantiation will be triggered, which is what happens on some pages
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetLifecycleService {
  private widgetViewWillEnterSubject: Subject<string[]> = new Subject();
  private widgetViewDidEnterSubject: Subject<string[]> = new Subject();
  private widgetViewWillLeaveSubject: Subject<string[]> = new Subject();
  private widgetViewDidLeaveSubject: Subject<string[]> = new Subject();

  constructor() {}

  sendWidgetViewWillEnter(widgets) {
    this.widgetViewWillEnterSubject.next(widgets);
  }

  widgetViewWillEnter(widgetId: string): Observable<string[]> {
    return this.widgetViewWillEnterSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewDidEnter(widgets) {
    this.widgetViewDidEnterSubject.next(widgets);
  }

  widgetViewDidEnter(widgetId: string): Observable<string[]> {
    return this.widgetViewDidEnterSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewWillLeave(widgets) {
    this.widgetViewWillLeaveSubject.next(widgets);
  }

  widgetViewWillLeave(widgetId: string): Observable<string[]> {
    return this.widgetViewWillLeaveSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewDidLeave(widgets) {
    this.widgetViewDidLeaveSubject.next(widgets);
  }

  widgetViewDidLeave(widgetId: string): Observable<string[]> {
    return this.widgetViewDidLeaveSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }
}

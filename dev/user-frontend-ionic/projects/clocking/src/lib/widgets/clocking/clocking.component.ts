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

import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { getExpectedErrorMessage, ThemeService } from '@ul/shared';
import { Observable } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { Clocking, clocking$ } from '../../clocking.repository';
import { ClockingService } from '../../clocking.service';

@Component({
  selector: 'app-clocking-widget',
  templateUrl: './clocking.component.html',
  styleUrls: ['../../../../../../src/theme/app-theme/clocking/clocking.component.scss'],
})
export class ClockingComponent implements AfterViewInit {

  @Input() widgetColor: string;

  public isLoading = false;
  public clocking$: Observable<Clocking> = clocking$;
  public clockInLoading = false;
  public errorMessage: string | null = null;

  constructor(private clockingService: ClockingService,
    private themeService: ThemeService,
    private changeDetectorRef: ChangeDetectorRef) { }

  widgetViewDidEnter(): void {
    this.isLoading = true;
    this.clockingService.loadClockingIfNetworkAvailable()
      .pipe(
        take(1),
        catchError(err => this.catchExpectedError(err)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(() => this.errorMessage = null);
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  onClockIn(event: MouseEvent) {
    event.stopPropagation(); // prevent from triggering card click

    this.clockInLoading = true;
    this.clockingService.clockIn().pipe(
      take(1),
      catchError(err => this.catchExpectedError(err)),
      finalize(() => this.clockInLoading = false)
    )
    .subscribe(() => this.errorMessage = null);
  }

  fontColor() {
    return this.themeService.isBackgroundFromCmsDarkOrIsDarkTheme(this.widgetColor) ?
      'light-font-color' : 'dark-font-color';
  }

  private catchExpectedError(err) {
    this.errorMessage = getExpectedErrorMessage(err);
    if (!this.errorMessage) {
      throw err;
    }
    return null;
  }
}

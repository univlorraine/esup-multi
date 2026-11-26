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

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IonProgressBar } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import * as OTPAuth from 'otpauth';
import { TotpAccount } from '../totp.repository';

const FALLBACK_PERIOD = 30;
const TICK_INTERVAL_MS = 1000;

/**
 * Affiche le code TOTP courant d'un compte et son temps de validité restant.
 *
 * Le code est recalculé à chaque frontière de période, puis une fois par
 * seconde pour faire avancer le compte à rebours.
 */
@Component({
  selector: 'app-totp-code',
  templateUrl: './totp-code.component.html',
  styleUrls: ['../../../../../../src/theme/app-theme/styles/mfa/totp-code.component.scss'],
  imports: [TranslatePipe, IonProgressBar],
})
export class TotpCodeComponent implements OnInit, OnChanges, OnDestroy {
  @Input({ required: true }) account!: TotpAccount;

  protected code = '';
  protected remainingSeconds = 0;
  protected progress = 0;

  private totp!: OTPAuth.TOTP;
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.buildTotp();
    this.refresh();
    this.scheduleNextTick();
  }

  /**
   * Le composant est réutilisé quand le compte change (remplacement par un
   * nouveau lien) : sans reconstruire l'instance TOTP, l'ancien secret
   * continuerait d'être utilisé et le code affiché ne changerait pas.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['account'] || changes['account'].firstChange) {
      return;
    }

    this.buildTotp();
    this.refresh();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }

  private buildTotp(): void {
    this.totp = new OTPAuth.TOTP({
      issuer: this.account.issuer,
      label: this.account.name,
      secret: this.account.secret,
      algorithm: this.account.algorithm.toUpperCase(),
      digits: this.account.digits,
      period: this.periodSeconds,
    });
  }

  protected get formattedCode(): string {
    const half = Math.ceil(this.code.length / 2);
    return `${this.code.slice(0, half)} ${this.code.slice(half)}`.trim();
  }

  private get periodSeconds(): number {
    return this.account.period > 0 ? this.account.period : FALLBACK_PERIOD;
  }

  private get periodMs(): number {
    return this.periodSeconds * TICK_INTERVAL_MS;
  }

  /**
   * Replanifie un tick à chaque frontière de seconde au lieu d'utiliser un
   * intervalle fixe : un intervalle dérive (chaque callback en retard décale le
   * suivant), ce qui faisait changer le code jusqu'à une seconde après la
   * frontière de période.
   */
  private scheduleNextTick(): void {
    this.timeoutId = setTimeout(() => {
      this.refresh();
      this.scheduleNextTick();
    }, this.msToNextTick());
  }

  private msToNextTick(): number {
    return TICK_INTERVAL_MS - (Date.now() % TICK_INTERVAL_MS);
  }

  private refresh(): void {
    this.code = this.totp.generate();

    const remainingMs = this.totp.remaining();

    this.remainingSeconds = Math.ceil(remainingMs / TICK_INTERVAL_MS);
    this.progress = remainingMs / this.periodMs;
  }
}

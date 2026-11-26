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

import { inject, Injectable, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import * as OTPAuth from 'otpauth';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { MFA_CONFIG, MfaModuleConfig } from '../mfa.config';
import { TotpAccount, TotpRepository } from './totp.repository';

/**
 * Clé de déduplication des liens déjà consommés. On ne stocke qu'une empreinte
 * du lien (jamais le lien lui-même, qui contient le secret).
 */
const HANDLED_ENROLLMENT_KEY = 'mfa-totp-handled-enrollment';

/**
 * Capture les liens d'enrôlement TOTP ouverts depuis l'extérieur de
 * l'application et les expose à l'écran MFA.
 *
 * Le secret n'est jamais transmis au routeur : il reste en mémoire dans ce
 * service, pour ne pas finir dans l'historique de navigation ni dans les logs.
 */
@Injectable({
  providedIn: 'root',
})
export class TotpEnrollmentLinkService {
  private readonly config = inject<MfaModuleConfig>(MFA_CONFIG);
  private readonly zone = inject(NgZone);
  private readonly totpRepository = inject(TotpRepository);
  private readonly router = inject(Router);

  private readonly pendingEnrollmentSubject = new BehaviorSubject<TotpAccount | null>(null);
  private pendingFingerprint: string | null = null;
  private isInitialized = false;

  /**
   * Enrôlement TOTP reçu par lien et non encore confirmé par l'utilisateur.
   * Émet `null` tant qu'aucun lien valide n'a été ouvert.
   */
  public readonly pendingEnrollment$: Observable<TotpAccount | null> =
    this.pendingEnrollmentSubject.asObservable();

  /**
   * Branche l'écoute des liens d'enrôlement. À appeler une seule fois au
   * démarrage de l'application, idéalement via un `provideAppInitializer`.
   *
   * - `getLaunchUrl` couvre le démarrage à froid (l'app est ouverte par le lien) ;
   * - `appUrlOpen` couvre l'app déjà lancée, y compris en arrière-plan.
   */
  public async init(): Promise<void> {
    if (this.isInitialized || !Capacitor.isNativePlatform()) {
      return;
    }

    if (this.config.availableFactors.find((factor) => factor.id === 'totp') === undefined) {
      return;
    }

    this.isInitialized = true;

    await App.addListener(
      'appUrlOpen',
      (event: URLOpenListenerEvent) => void this.handleEnrollmentUri(event.url),
    );

    const launchUrl = await App.getLaunchUrl();
    if (launchUrl?.url) {
      void this.handleEnrollmentUri(launchUrl.url);
    }
  }

  /**
   * Enregistre un enrôlement dans le stockage sécurisé, mémorise l'empreinte du
   * lien (pour ne pas le rejouer au prochain démarrage) et vide l'enrôlement
   * en attente une fois l'écriture réussie.
   */
  public enroll(account: TotpAccount): Observable<void> {
    return this.totpRepository.saveTotpAccount(account).pipe(
      tap(() => {
        if (this.pendingFingerprint) {
          localStorage.setItem(HANDLED_ENROLLMENT_KEY, this.pendingFingerprint);
        }
        this.pendingFingerprint = null;
        this.pendingEnrollmentSubject.next(null);
      }),
    );
  }

  /** Abandonne l'enrôlement en attente (lien refusé par l'utilisateur). */
  public discard(): void {
    this.pendingFingerprint = null;
    this.pendingEnrollmentSubject.next(null);
  }

  /**
   * Oublie l'empreinte du dernier lien consommé, pour autoriser un nouvel
   * enrôlement avec le même lien après suppression du facteur.
   */
  public forgetLastEnrollment(): void {
    localStorage.removeItem(HANDLED_ENROLLMENT_KEY);
  }

  /**
   * Empreinte non cryptographique du lien (FNV-1a doublé). Le lien contient le
   * secret : on ne persiste que cette empreinte, jamais le lien.
   */
  private fingerprint(uri: string): string {
    let first = 0x811c9dc5;
    let second = 0x01000193;

    for (let index = 0; index < uri.length; index++) {
      const code = uri.charCodeAt(index);
      first = Math.imul(first ^ code, 0x01000193) >>> 0;
      second = Math.imul(second ^ code, 0x85ebca6b) >>> 0;
    }

    return `${first.toString(16)}${second.toString(16)}`;
  }

  private handleEnrollmentUri(uri: string): void {
    let totp: OTPAuth.HOTP | OTPAuth.TOTP;

    try {
      totp = OTPAuth.URI.parse(uri);
    } catch {
      // L'URI contient le secret : elle ne doit jamais être logguée.
      console.error("MFA: lien d'enrôlement TOTP invalide");
      return;
    }

    if (!(totp instanceof OTPAuth.TOTP)) {
      console.error("MFA: le lien d'enrôlement n'est pas un TOTP");
      return;
    }

    // Android rejoue l'intent de lancement (`getLaunchUrl` / `appUrlOpen`) à
    // chaque recréation de l'activité : sans cette déduplication, un lien déjà
    // confirmé serait reproposé.
    const fingerprint = this.fingerprint(uri);
    if (localStorage.getItem(HANDLED_ENROLLMENT_KEY) === fingerprint) {
      return;
    }

    const account: TotpAccount = {
      secret: totp.secret.base32,
      name: totp.label,
      issuer: totp.issuer,
      algorithm: totp.algorithm,
      digits: totp.digits,
      period: totp.period,
    };

    // Le listener natif s'exécute hors de la zone Angular : sans ce `run`,
    // l'`async` pipe ne serait pas ré-évalué.
    this.zone.run(() => {
      this.pendingFingerprint = fingerprint;
      this.pendingEnrollmentSubject.next(account);
      void this.redirectToMfa();
    });
  }

  /**
   * Amène l'utilisateur sur l'écran MFA pour qu'il confirme l'enrôlement.
   *
   * Au démarrage à froid, `init()` s'exécute pendant l'initialisation de
   * l'application : la navigation initiale du routeur n'a pas encore eu lieu.
   * On attend donc le premier `NavigationEnd` avant de rediriger, sinon notre
   * navigation serait écrasée par la navigation initiale.
   */
  private async redirectToMfa(): Promise<void> {
    if (this.router.url.startsWith('/mfa')) {
      return;
    }

    if (!this.router.navigated) {
      await firstValueFrom(
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
      );
    }

    await this.router.navigateByUrl('/mfa');
  }
}

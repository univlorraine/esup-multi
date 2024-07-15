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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { AuthenticatedUser, NavigationService } from '@multi/shared';
import { Observable } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { PreferencesService } from '../preferences/preferences.service';
import { LoginRepository, TranslatedLoginPageContent } from '../common/login.repository';
import { LoginService } from '../common/login.service';

interface AuthenticatedUserToken extends AuthenticatedUser {
  authToken: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../../../../../src/theme/app-theme/styles/auth/login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  public saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;
  public isLoading = false;
  public translatedPageContent$: Observable<TranslatedLoginPageContent>;
  public hideBackButton$: Observable<boolean>;


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private toastController: ToastController,
    private preferencesService: PreferencesService,
    private loginService: LoginService,
    private loginRepository: LoginRepository,
    private route: ActivatedRoute,
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.translatedPageContent$ = this.loginRepository.translatedPageContent$;
    this.hideBackButton$ = this.navigationService.isExternalNavigation$;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get savePassword() {
    return this.loginForm.get('savePassword');
  }

  ngOnInit() {
    this.loginService.loadAndStoreLoginPageContent()
      .pipe(take(1))
      .subscribe();

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // We update the username value with its lowercase version
    this.loginForm.controls.username.valueChanges.subscribe(value => {
      if(!value) {
        return;
      }
      this.loginForm.controls.username.setValue(value.trim().toLowerCase(), { emitEvent: false });
    });
  }

  ionViewWillEnter() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
    this.isLoading = false;
    this.loginForm.reset();
  }

  onSaveCredentialsOnAuthenticationChange(event) {
    const saveCredentials = event.detail.checked;
    this.preferencesService.saveCredentialsOnAuthenticationChange(saveCredentials);
  }

  keyboardSubmit() {
    if (this.loginForm.valid && !this.isLoading) {
      this.submit();
    }
  }

  gotoField(field: IonInput) {
    field.setFocus();
  }

  submit() {
    this.isLoading = true;
    this.authService
      .login(this.username?.value, this.password?.value).pipe(
      tap(val => !val && this.showToastConnectionFail()),
      finalize(() => this.isLoading = false)
    )
      .subscribe((token: AuthenticatedUserToken) => {
        if (!token) {
          return;
        }
        this.authService.dispatchLoginAction();

        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
          return;
        }

        this.router.navigate(['/features/widgets']);
      });
  }

  async showToastConnectionFail() {
    const toast = await this.toastController.create({
      message: 'Identifiants incorrects',
      duration: 1500,
      position: 'middle',
      color: 'warning'
    });
    toast.present();
  }
}

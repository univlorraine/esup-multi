import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticatedUser, NavigationService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { PreferencesService } from '../preferences/preferences.service';
import { LoginRepository, TranslatedLoginPageContent } from './login.repository';
import { LoginService } from './login.service';

interface AuthenticatedUserToken extends AuthenticatedUser {
  authToken: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;
  public isLoading = false;
  public translatedPageContent$: Observable<TranslatedLoginPageContent>;


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private toastController: ToastController,
    private preferencesService: PreferencesService,
    private navigationService: NavigationService,
    private loginService: LoginService,
    private loginRepository: LoginRepository,
  ) {
    this.translatedPageContent$ = this.loginRepository.translatedPageContent$;
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
    .pipe(first())
    .subscribe();

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ionViewWillEnter() {
    this.isLoading = false;
    this.loginForm.reset();
  }

  onSaveCredentialsOnAuthenticationChange(event) {
    const saveCredentials = event.detail.checked;
    this.preferencesService.saveCredentialsOnAuthenticationChange(saveCredentials);
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
        this.navigationService.navigateBack();
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticatedUser, isLoggedTourViewed, NavigationService } from '@ul/shared';
import { Observable } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
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
    private router: Router,
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
        if(!isLoggedTourViewed()) {
          this.router.navigate(['/features/widgets']);
        } else {
          this.navigationService.navigateBack();
        }
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

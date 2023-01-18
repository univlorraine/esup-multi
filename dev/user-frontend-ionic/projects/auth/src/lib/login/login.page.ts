import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../common/auth.service';
import { saveCredentialsOnAuthentication$ } from '../preferences/preferences.repository';
import { PreferencesService } from '../preferences/preferences.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  public saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private preferencesService: PreferencesService) { }

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
      .subscribe(
        () => {
          this.router.navigate(['auth/connected']);
        }
      );
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

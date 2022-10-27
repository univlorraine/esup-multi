import { Component, OnInit } from '@angular/core';
import { saveCredentialsOnAuthentication$, setSaveCredentialsOnAuthentication } from './preferences.repository';

@Component({
  selector: 'app-auth-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {

  saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;

  constructor() { }

  onSaveCredentialsOnAuthenticationChange(event) {
    setSaveCredentialsOnAuthentication(event.detail.checked);
  }

}

import { Component } from '@angular/core';
import { saveCredentialsOnAuthentication$ } from './preferences.repository';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-auth-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {

  saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;

  constructor(private preferencesService: PreferencesService) {
  }

  onSaveCredentialsOnAuthenticationChange(event) {
      const saveCredentials = event.detail.checked;
      this.preferencesService.saveCredentialsOnAuthenticationChange(saveCredentials);
  }
}

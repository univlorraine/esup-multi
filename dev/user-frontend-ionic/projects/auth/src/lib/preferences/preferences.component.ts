import { Component } from '@angular/core';
import { PreferencesService } from './preferences.service';

import { saveCredentialsOnAuthentication$, setSaveCredentialsOnAuthentication } from './preferences.repository';

@Component({
  selector: 'app-auth-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {

  saveCredentialsOnAuthentication$ = saveCredentialsOnAuthentication$;

  constructor(private preferencesService: PreferencesService) { }

  onSaveCredentialsOnAuthenticationChange(event) {
    const saveCredentialsOnAuthentication = event.detail.checked;
    setSaveCredentialsOnAuthentication(saveCredentialsOnAuthentication);

    if (saveCredentialsOnAuthentication === false) {
      this.preferencesService.removeSavedCredentialsIfExists();
    }
  }
}

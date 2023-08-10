import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticatedUser, authenticatedUser$, AuthorizationHelper } from '@ul/shared';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { ScheduleModuleConfig, SCHEDULE_CONFIG } from '../../schedule.config';
import { impersonatedScheduleStoreManager } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss'],
})
export class SelectUserComponent {

  public form: FormGroup;
  public isSelectUserModalOpen = false;
  public isAuthorizedUser$: Observable<boolean>;

  constructor(@Inject(SCHEDULE_CONFIG) private config: ScheduleModuleConfig, private scheduleService: ScheduleService) {
    this.isAuthorizedUser$ = authenticatedUser$.pipe(
      filter((authenticatedUser: AuthenticatedUser) => !!authenticatedUser),
      take(1),
      map((authenticatedUser: AuthenticatedUser) => {
        const authorizationHelper = new AuthorizationHelper(authenticatedUser.roles);
        return authorizationHelper.filter([
          {
            authorization: {
              roles: this.config.managerRoles || [],
              type: 'ALLOW'
            }
          }
        ]).length > 0;
      })
    );

    this.form = new FormGroup({
      login: new FormControl(null, Validators.required),
    });
  }

  openSelectUserModal() {
    this.form.reset();
    this.isSelectUserModalOpen = true;
  }

  onDismissSelectUserModal() {
    this.isSelectUserModalOpen = false;
  }

   onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const login = this.form.value.login;
    this.isSelectUserModalOpen = false;
    impersonatedScheduleStoreManager.resetStore();
    this.scheduleService.setAsUser(login);
    this.scheduleService.loadScheduleToState().pipe(take(1)).subscribe();
  }
}
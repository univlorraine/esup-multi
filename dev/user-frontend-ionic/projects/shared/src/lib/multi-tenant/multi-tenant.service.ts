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

import {Inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {
  NoModulesConfigurationError,
  NoTenantSelectedError,
  NoTenantsError,
  NoTenantWithIdError
} from './multi-tenant.error';
import { Tenant } from './multi-tenant.model';
import { updateSelectedTenantId, getSelectedTenantId } from './multi-tenant-selected.repository';
import { getRegistry } from '@ngneat/elf';
import { setTenantThemeApplied } from '../theme/theme.repository';
import { FCMService } from '../fcm/fcm-global.service';
import { BehaviorSubject, Observable, Subject, withLatestFrom } from 'rxjs';
import { authenticatedUserRepoInitialized$, userIsAuthenticated$ } from '../auth/authenticated-user.repository';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultiTenantService {
  public currentTenantLogo$: Observable<string>;
  public tenantChange$: Observable<Tenant>;

  private currentTenant: Tenant;
  private currentTenantLogoSubject = new BehaviorSubject<string>(this.environment.defaultLogo);
  private tenantChangeSubject = new Subject<Tenant>();

  constructor(
    @Inject('environment')
    private environment: any,
    private router: Router,
    private fcmService: FCMService,
  ) {
    this.currentTenantLogo$ = this.currentTenantLogoSubject.asObservable();
    this.tenantChange$ = this.tenantChangeSubject.asObservable();

    const tenantId = getSelectedTenantId();
    if(tenantId) {
      this.setCurrentTenantById(tenantId);
    }

    userIsAuthenticated$.pipe(
      withLatestFrom(authenticatedUserRepoInitialized$),
      filter(([isAuth, isAuthRepoInit]) => !isAuth && isAuthRepoInit)
    ).subscribe(() => {
      if(this.currentTenant && this.canUseGroupMode()) { // Only disconnect from tenant when we can use the group mode
        this.disconnectFromTenant();
      }
    });
  }

  public getApiEndpoint(): string {
    return this.getCurrentTenantOrThrowError().apiEndpoint;
  }

  public getCmsPublicAssetsEndpoint(): string {
    return this.getCurrentTenantOrThrowError().cmsPublicAssetsEndpoint;
  }

  public getCurrentTenantOrThrowError(): Tenant {
    if(!this.isCurrentTenantStateAllowed()) {
      throw new NoTenantSelectedError();
    }

    return this.currentTenant ?? this.getAvailableTenants()[0];
  }

  public isCurrentTenantStateAllowed(): boolean {
    if(this.currentTenant) {
      if(this.currentTenant.isGroup === false) {
        // There's a tenant and it's not a group, all good
        return true;
      }

      // Group: tenant must be selected if forceSelect is true
      return !(this.currentTenant.forceSelect === true);
    }

    // No tenant is selected
    const availableTenants = this.getAvailableTenants();

    if(!this.isSingleTenant()) {
      // There are multiple tenants, one must be selected
      return false;
    }

    // There is only one tenant at root level, so unless it is a group and forceSelect is true, the state is allowed
    return availableTenants[0].isGroup === false || availableTenants[0].forceSelect === false;
  }

  public getAvailableTenants(): Tenant[] {
    return this.getTenants();
  }

  public setCurrentTenantById(tenantId: string): void {
    const foundTenant = this.findTenant(tenantId);
    const previousTenantId = this.getSelectedTenantId();
    if (!foundTenant) {
      this.currentTenantLogoSubject.next(this.environment.defaultLogo);
      throw new NoTenantWithIdError(tenantId);
    }
    updateSelectedTenantId(tenantId);
    this.currentTenant = foundTenant;
    this.applyTenantTheme(this.currentTenant.id);
    if(previousTenantId !== tenantId) { // If the tenant changes from previous value
      this.tenantChangeSubject.next(foundTenant);
    }
    if(this.currentTenant?.logo) {
      this.currentTenantLogoSubject.next(this.currentTenant.logo);
    }
  }

  public getSelectedTenantId(): string {
    const foundTenant = this.findTenant(getSelectedTenantId());
    return foundTenant?.id || this.getAvailableTenants()[0]?.id;
  }

  public isSingleTenant(): boolean {
    const tenants = this.getTenants();
    return tenants?.length === 1;
  }

  public hasCurrentTenant(): boolean {
    return this.currentTenant !== undefined;
  }

  public getModuleConfiguration(configName: string): any {
    const modulesConfiguration = this.getCurrentTenantOrThrowError().modulesConfigurations;
    if (!modulesConfiguration) {
      throw new NoModulesConfigurationError(configName, this.currentTenant.id);
    }
    // Get module configuration with configName and dot notation
    return configName.split('.').reduce((modulesConfig: any, config: string) => {
      const currentModuleConfig = modulesConfig[config];
      if (!currentModuleConfig) {
        throw new NoModulesConfigurationError(configName, this.currentTenant.id);
      }
      return currentModuleConfig;
    }, modulesConfiguration);
  }

  public async redirectToTenantSelection(backToAuth: boolean = false) {
    if(backToAuth) {
      await this.router.navigate(['/multi-tenant/select'], {queryParams: {redirectToAuth: true}});
      return;
    }
    await this.router.navigate(['/multi-tenant/select']);
  }

  public disconnectFromTenant() {
    getRegistry().forEach(store => store.reset());
    updateSelectedTenantId(undefined);
    const defaultTheme = this.environment.defaultTheme || '';
    this.currentTenant = undefined;
    this.applyTenantTheme(defaultTheme);
    this.tenantChangeSubject.next(undefined);
    this.currentTenantLogoSubject.next(this.environment.defaultLogo);
    this.fcmService.unsubscribeFromTopic();
  }

  public getFlattenTenantObjects(t: Tenant[], level: number): Tenant[] {
    let tenants: Tenant[] = t;
    if (t === undefined && level === 0) {
      tenants = this.environment.tenants;
    }

    return tenants.reduce((flattened, tenant) => {
      flattened.push(tenant);
      if (tenant.tenants) {
        flattened.push(...this.getFlattenTenantObjects(tenant.tenants, 1));
      }
      return flattened;
    }, []);
  }

  public flattenTenantObjects(tenants: Tenant[]): Tenant[] {
    return tenants.reduce((flattened, tenant) => {
      flattened.push(tenant);
      if (tenant.tenants) {
        flattened.push(...this.flattenTenantObjects(tenant.tenants));
      }
      return flattened;
    }, []);
  }

  public applyTenantTheme(theme: string): void {
    setTenantThemeApplied(theme);
  }

  private getTenants(): Tenant[] {
    const tenants = this.environment.tenants;
    if (!tenants) {
      throw new NoTenantsError();
    }
    return tenants;
  }

  private findTenant(tenantId: string): Tenant {

    const flattenedTenants = this.getFlattenTenantObjects(undefined, 0);

    return flattenedTenants.find((tenant: Tenant) => tenant.id === tenantId);
  }

  // Tells if we can use the tenant group, i.e. not having a specific tenant selected
  private canUseGroupMode(): boolean {
    // There is a group defined and the group does not force tenant selection
    return this.getAvailableTenants()[0].isGroup === true && this.getAvailableTenants()[0].forceSelect === false
  }
}

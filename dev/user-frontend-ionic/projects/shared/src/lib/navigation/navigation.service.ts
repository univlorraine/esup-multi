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

import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ProjectModuleService } from '../project-module/project-module.service';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public currentRouterLink$: Observable<string>;
    private currentRouterLinkSubject$ = new BehaviorSubject<string>('/');
    private history: string[] = [];
    private lastPausedDate: null | Date = null;
    private pausedMinutesBeforeRefresh = 15;

    constructor(
        private router: Router,
        private projectModuleService: ProjectModuleService,
        private platform: Platform,
    ) {
        // feed current router link
        this.currentRouterLink$ = this.currentRouterLinkSubject$;
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            map((event: RouterEvent): NavigationEnd => event as NavigationEnd),
            map(navigationEnd => navigationEnd.urlAfterRedirects),
        ).subscribe(this.currentRouterLinkSubject$);

        // feed history
        this.currentRouterLink$.pipe(
            filter(url => !this.projectModuleService.getHistoryBlacklist().includes(url)),
            filter(url => url !== this.history.slice(-1)[0]),// prevent direct duplicate
            tap(url => this.history.push(url)),
        ).subscribe();

        this.setupInactiveRefresh();
    }

    navigateBack() {
        this.history.pop(); // pop current url
        const previousUrl = this.history.pop() || '/'; // pop previous url
        this.router.navigateByUrl(previousUrl, { replaceUrl: true });
    }

    navigateToAuth() {
      this.router.navigateByUrl('/auth');
    }

    private setupInactiveRefresh() {
        this.platform.ready().then(() => {
            this.platform.pause.subscribe(() => {
                this.lastPausedDate = new Date();
            });

            this.platform.resume.subscribe(() => {
                if(this.lastPausedDate === null) {
                    return;
                }

                const currentDate = new Date();
                const diffInMinutes = (currentDate.getTime() - this.lastPausedDate.getTime()) / (1000 * 60);
                if(diffInMinutes >= this.pausedMinutesBeforeRefresh) {
                    window.location.reload();
                }

                this.lastPausedDate = null;
            });
        });
    }
}

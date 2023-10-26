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

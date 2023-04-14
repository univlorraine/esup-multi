import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ProjectModuleService } from '../project-module/project-module.service';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public currentRouterLink$: Observable<string>;
    private currentRouterLinkSubject$ = new BehaviorSubject<string>('/');
    private history: string[] = [];

    constructor(
        private router: Router,
        private projectModuleService: ProjectModuleService,
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
    }

    navigateBack() {
        this.history.pop(); // pop current url
        const previousUrl = this.history.pop() || '/'; // pop previous url
        this.router.navigateByUrl(previousUrl);
    }
}
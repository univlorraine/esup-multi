import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

export interface NavigationRouterLink {
    current: string;
    previous: string;
}


@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public navigationRouterLink$: Observable<NavigationRouterLink>;
    private navigationRouterLinkSubject$ = new BehaviorSubject<NavigationRouterLink>({
        current: '/',
        previous: '/'
    });

    constructor(
        private router: Router,
    ) {
        this.navigationRouterLink$ = this.navigationRouterLinkSubject$;

        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            map((event: RouterEvent): NavigationEnd => event as NavigationEnd),
            map(navigatioEnd => navigatioEnd.urlAfterRedirects),
            startWith('/'),
            pairwise(),
            map(([previous, current]) => ({
                previous,
                current
            }))
        ).subscribe(this.navigationRouterLinkSubject$);
    }

}

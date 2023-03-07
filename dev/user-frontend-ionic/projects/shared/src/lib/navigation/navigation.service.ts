import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

export interface NavigationPath {
    current: string;
    previous: string;
}


@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public navigationPath$: Observable<NavigationPath>;
    private navigationPathSubject$ = new BehaviorSubject<NavigationPath>({
        current: '/',
        previous: '/'
    });

    constructor(
        private router: Router,
    ) {
        this.navigationPath$ = this.navigationPathSubject$;

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
        ).subscribe(this.navigationPathSubject$);
    }

}

import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    public currentRouterLink$: Observable<string>;
    private currentRouterLinkSubject$ = new BehaviorSubject<string>('/');
    private history: string[] = [];

    constructor(
        private router: Router,
        private location: Location,
    ) {
        this.currentRouterLink$ = this.currentRouterLinkSubject$;
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
            map((event: RouterEvent): NavigationEnd => event as NavigationEnd),
            map(navigationEnd => navigationEnd.urlAfterRedirects),
            tap(url => this.history.push(url))
        ).subscribe(this.currentRouterLinkSubject$);
    }

    navigateBack() {
        this.history.pop();
        if (this.history.length > 0) {
            this.location.back();
        } else {
            this.router.navigateByUrl('/');
        }
    }
}

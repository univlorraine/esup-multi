import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

/**
 * To use the widget lifecycle events in your widget, you will just need to implement any of the following methods in
 * it, those methods will be triggered by the parent component WidgetComponent:
 * - widgetViewWillEnter(void)
 * - widgetViewDidEnter(void)
 * - widgetViewWillLeave(void)
 * - widgetViewDidLeave(void)
 *
 * [NOTE] We need MULTI-258 to be fixed before some of the widgets can use that, if the widget is instanced two times
 * on the same page only the methods of the first instantiation will be triggered, which is what happens on some pages
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetLifecycleService {
  private widgetViewWillEnterSubject: Subject<string[]> = new Subject();
  private widgetViewDidEnterSubject: Subject<string[]> = new Subject();
  private widgetViewWillLeaveSubject: Subject<string[]> = new Subject();
  private widgetViewDidLeaveSubject: Subject<string[]> = new Subject();

  constructor() {}

  sendWidgetViewWillEnter(widgets) {
    this.widgetViewWillEnterSubject.next(widgets);
  }

  widgetViewWillEnter(widgetId: string): Observable<string[]> {
    return this.widgetViewWillEnterSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewDidEnter(widgets) {
    this.widgetViewDidEnterSubject.next(widgets);
  }

  widgetViewDidEnter(widgetId: string): Observable<string[]> {
    return this.widgetViewDidEnterSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewWillLeave(widgets) {
    this.widgetViewWillLeaveSubject.next(widgets);
  }

  widgetViewWillLeave(widgetId: string): Observable<string[]> {
    return this.widgetViewWillLeaveSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }

  sendWidgetViewDidLeave(widgets) {
    this.widgetViewDidLeaveSubject.next(widgets);
  }

  widgetViewDidLeave(widgetId: string): Observable<string[]> {
    return this.widgetViewDidLeaveSubject.asObservable().pipe(
      filter(widgetIds => widgetIds.includes(widgetId)),
      shareReplay()
    );
  }
}

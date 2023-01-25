import { Injectable } from '@angular/core';
import { Type } from '@angular/core';


export interface Widget {
    id: string;
    component: Type<any>;
}

@Injectable({
    providedIn: 'root'
})
export class WidgetsService {

    private widgetsComponentsById: Map<string, Widget> = new Map();

    public addWidgets(widgets: Widget[]) {
        widgets.forEach(widget => this.addWidget(widget));
    }

    public getWidget(widgetId: string) {
        return this.widgetsComponentsById.get(widgetId);
    }

    private addWidget(widget: Widget) {
        this.widgetsComponentsById.set(widget.id, widget);
    }

}

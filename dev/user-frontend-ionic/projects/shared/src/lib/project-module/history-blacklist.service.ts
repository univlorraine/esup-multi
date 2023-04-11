import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HistoryBlacklistService {

    private historyBlacklist: string[] = [];

    public addHistoryBlacklist(historyBlacklist: string[]) {
        this.historyBlacklist.push(...historyBlacklist);
    }

    public getHistoryBlacklist() {
        return this.historyBlacklist;
    }
}

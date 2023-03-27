import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdGeneratorService {

  public static initRandomUserId(): string {
    const date = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substring(2, 7);
    return (date + randomNumber).toUpperCase();
  }
}

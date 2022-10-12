import { Injectable } from "@angular/core";
import { TestService } from "./test.service";

@Injectable()
export class BrowserTestService extends TestService {
    test(): string {
        return "Browser";
    }    
}
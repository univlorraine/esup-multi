import { Injectable } from "@angular/core";
import { TestService } from "./test.service";

@Injectable()
export class MobileTestService extends TestService {
    test(): string {
        return "Mobile";
    }    
}
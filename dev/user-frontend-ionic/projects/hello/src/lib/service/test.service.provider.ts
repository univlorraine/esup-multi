import { Platform } from "@ionic/angular";
import { BrowserTestService } from "./browser-test.service";
import { MobileTestService } from "./mobile-test.service";
import { TestService } from "./test.service";

const testServiceFactory = (platform: Platform) =>
  (platform.is('mobile') ? 
    new MobileTestService() :
    new BrowserTestService()
);

export const testServiceProvider =
  { provide: TestService,
    useFactory: testServiceFactory,
    deps: [Platform]
  };
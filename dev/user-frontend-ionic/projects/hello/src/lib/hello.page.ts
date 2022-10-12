import { Component, OnInit } from '@angular/core';
import { TestService } from './service/test.service';
import { testServiceProvider } from './service/test.service.provider';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.page.html',
  styleUrls: ['./hello.page.scss'],
  providers: [testServiceProvider]
})
export class HelloPage implements OnInit {

  public message: string;

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.message = this.testService.test();
  }

}

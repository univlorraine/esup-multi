import { TestBed } from '@angular/core/testing';

import { RssService } from './rss.service';

describe('RssService', () => {
  let service: RssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VisitorPersonService } from './visitor-person.service';

describe('VisitorPersonService', () => {
  let service: VisitorPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

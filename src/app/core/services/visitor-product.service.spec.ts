import { TestBed } from '@angular/core/testing';

import { VisitorProductService } from './visitor-product.service';

describe('VisitorProductService', () => {
  let service: VisitorProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

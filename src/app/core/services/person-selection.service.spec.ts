import { TestBed } from '@angular/core/testing';

import { PersonSelectionService } from './person-selection.service';

describe('PersonSelectionService', () => {
  let service: PersonSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

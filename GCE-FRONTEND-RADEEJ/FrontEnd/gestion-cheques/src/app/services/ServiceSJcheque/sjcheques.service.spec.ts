import { TestBed } from '@angular/core/testing';

import { SjchequesService } from './sjcheques.service';

describe('SjchequesService', () => {
  let service: SjchequesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SjchequesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

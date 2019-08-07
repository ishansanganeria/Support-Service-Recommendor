import { TestBed } from '@angular/core/testing';

import { GetAverageService } from './get-average.service';

describe('GetAverageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAverageService = TestBed.get(GetAverageService);
    expect(service).toBeTruthy();
  });
});

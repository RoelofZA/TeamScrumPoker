import { TestBed } from '@angular/core/testing';

import { PokerServiceService } from './poker-service.service';

describe('PokerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PokerServiceService = TestBed.get(PokerServiceService);
    expect(service).toBeTruthy();
  });
});

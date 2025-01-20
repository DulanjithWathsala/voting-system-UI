import { TestBed } from '@angular/core/testing';

import { BallotService } from './ballot.service';

describe('BallotService', () => {
  let service: BallotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BallotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

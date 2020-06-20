import { TestBed } from '@angular/core/testing';

import { SharedauthService } from './sharedauth.service';

describe('SharedauthService', () => {
  let service: SharedauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

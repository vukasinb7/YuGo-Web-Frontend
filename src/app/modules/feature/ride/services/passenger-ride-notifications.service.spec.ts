import { TestBed } from '@angular/core/testing';

import { PassengerRideNotificationsService } from './passenger-ride-notifications.service';

describe('PassengerRideNotificationsService', () => {
  let service: PassengerRideNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerRideNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

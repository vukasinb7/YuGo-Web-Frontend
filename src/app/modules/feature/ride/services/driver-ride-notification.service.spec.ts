import { TestBed } from '@angular/core/testing';

import { DriverRideNotificationService } from './driver-ride-notification.service';

describe('DriverRideNotificationService', () => {
  let service: DriverRideNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverRideNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

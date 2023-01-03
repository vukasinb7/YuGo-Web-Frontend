import { TestBed } from '@angular/core/testing';

import { DestinationPickerService } from './destination-picker.service';

describe('DestinationPickerService', () => {
  let service: DestinationPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestinationPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

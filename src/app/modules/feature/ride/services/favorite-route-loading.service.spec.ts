import { TestBed } from '@angular/core/testing';

import { FavoriteRouteLoadingService } from './favorite-route-loading.service';

describe('FavoriteRouteLoadingService', () => {
  let service: FavoriteRouteLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteRouteLoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

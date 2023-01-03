import { TestBed } from '@angular/core/testing';

import { FavoritePathService } from './favorite.path.service';

describe('FavoritePathService', () => {
  let service: FavoritePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePathComponent } from './favorite-path.component';

describe('FavoritePathComponent', () => {
  let component: FavoritePathComponent;
  let fixture: ComponentFixture<FavoritePathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

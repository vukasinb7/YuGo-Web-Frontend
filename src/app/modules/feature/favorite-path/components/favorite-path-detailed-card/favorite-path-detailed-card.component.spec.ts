import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePathDetailedCardComponent } from './favorite-path-detailed-card.component';

describe('FavoritePathDetailedCardComponent', () => {
  let component: FavoritePathDetailedCardComponent;
  let fixture: ComponentFixture<FavoritePathDetailedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePathDetailedCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePathDetailedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

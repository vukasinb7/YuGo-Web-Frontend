import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePathCardComponent } from './favorite-path-card.component';

describe('FavoritePathCardComponent', () => {
  let component: FavoritePathCardComponent;
  let fixture: ComponentFixture<FavoritePathCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePathCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePathCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

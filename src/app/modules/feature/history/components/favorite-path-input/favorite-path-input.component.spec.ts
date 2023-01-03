import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePathInputComponent } from './favorite-path-input.component';

describe('FavoritePathInputComponent', () => {
  let component: FavoritePathInputComponent;
  let fixture: ComponentFixture<FavoritePathInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritePathInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePathInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

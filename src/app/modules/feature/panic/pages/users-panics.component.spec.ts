import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPanicsComponent } from './users-panics.component';

describe('UsersPanicsComponent', () => {
  let component: UsersPanicsComponent;
  let fixture: ComponentFixture<UsersPanicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersPanicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPanicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

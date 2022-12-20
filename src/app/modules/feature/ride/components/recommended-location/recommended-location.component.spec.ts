import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedLocationComponent } from './recommended-location.component';

describe('RecommendedLocationComponent', () => {
  let component: RecommendedLocationComponent;
  let fixture: ComponentFixture<RecommendedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

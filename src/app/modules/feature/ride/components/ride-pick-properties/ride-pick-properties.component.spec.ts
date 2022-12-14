import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePickPropertiesComponent } from './ride-pick-properties.component';

describe('RidePickPropertiesComponent', () => {
  let component: RidePickPropertiesComponent;
  let fixture: ComponentFixture<RidePickPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidePickPropertiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePickPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

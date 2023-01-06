import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUpdateOverviewComponent } from './vehicle-update-overview.component';

describe('VehicleUpdateOverviewComponent', () => {
  let component: VehicleUpdateOverviewComponent;
  let fixture: ComponentFixture<VehicleUpdateOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleUpdateOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleUpdateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleChangeRequestsComponent } from './vehicle-change-requests.component';

describe('VehicleChangeRequestsComponent', () => {
  let component: VehicleChangeRequestsComponent;
  let fixture: ComponentFixture<VehicleChangeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleChangeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

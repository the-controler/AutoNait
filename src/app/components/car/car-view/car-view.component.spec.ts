import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarViewComponent } from './car-view.component';

describe('CarViewComponent', () => {
  let component: CarViewComponent;
  let fixture: ComponentFixture<CarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

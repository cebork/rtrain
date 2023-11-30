import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainSheduleHomeComponent } from './train-shedule-home.component';

describe('TrainSheduleHomeComponent', () => {
  let component: TrainSheduleHomeComponent;
  let fixture: ComponentFixture<TrainSheduleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainSheduleHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainSheduleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

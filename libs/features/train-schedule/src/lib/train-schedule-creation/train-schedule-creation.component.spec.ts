import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainScheduleCreationComponent } from './train-schedule-creation.component';

describe('TrainScheduleCreationComponent', () => {
  let component: TrainScheduleCreationComponent;
  let fixture: ComponentFixture<TrainScheduleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainScheduleCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainScheduleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

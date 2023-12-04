import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainScheduleCreationViewComponent } from './train-schedule-creation-view.component';

describe('TrainScheduleCreationViewComponent', () => {
  let component: TrainScheduleCreationViewComponent;
  let fixture: ComponentFixture<TrainScheduleCreationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainScheduleCreationViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainScheduleCreationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

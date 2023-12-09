import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RealtimeScheduleViewComponent } from './realtime-schedule-view.component';

describe('RealtimeScheduleViewComponent', () => {
  let component: RealtimeScheduleViewComponent;
  let fixture: ComponentFixture<RealtimeScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RealtimeScheduleViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RealtimeScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrafficLinesViewComponent } from './traffic-lines-view.component';

describe('TrafficLinesViewComponent', () => {
  let component: TrafficLinesViewComponent;
  let fixture: ComponentFixture<TrafficLinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficLinesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrafficLinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrafficGraphForLineComponent } from './traffic-graph-for-line.component';

describe('TrafficGraphForLineComponent', () => {
  let component: TrafficGraphForLineComponent;
  let fixture: ComponentFixture<TrafficGraphForLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficGraphForLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrafficGraphForLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

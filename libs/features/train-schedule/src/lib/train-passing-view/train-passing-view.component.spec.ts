import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainPassingViewComponent } from './train-passing-view.component';

describe('TrainPassingViewComponent', () => {
  let component: TrainPassingViewComponent;
  let fixture: ComponentFixture<TrainPassingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainPassingViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainPassingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

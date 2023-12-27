import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentsTrainViewComponent } from './incidents-train-view.component';

describe('IncidentsTrainViewComponent', () => {
  let component: IncidentsTrainViewComponent;
  let fixture: ComponentFixture<IncidentsTrainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentsTrainViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsTrainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

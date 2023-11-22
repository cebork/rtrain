import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainTypesHomeComponent } from './train-types-home.component';

describe('TrainTypesHomeComponent', () => {
  let component: TrainTypesHomeComponent;
  let fixture: ComponentFixture<TrainTypesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainTypesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainTypesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

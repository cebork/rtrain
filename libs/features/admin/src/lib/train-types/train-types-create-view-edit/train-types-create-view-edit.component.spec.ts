import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainTypesCreateViewEditComponent } from './train-types-create-view-edit.component';

describe('TrainTypesCreateViewEditComponent', () => {
  let component: TrainTypesCreateViewEditComponent;
  let fixture: ComponentFixture<TrainTypesCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainTypesCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainTypesCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

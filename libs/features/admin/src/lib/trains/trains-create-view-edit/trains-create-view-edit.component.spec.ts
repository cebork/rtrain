import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainsCreateViewEditComponent } from './trains-create-view-edit.component';

describe('TrainsCreateViewEditComponent', () => {
  let component: TrainsCreateViewEditComponent;
  let fixture: ComponentFixture<TrainsCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainsCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainsCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

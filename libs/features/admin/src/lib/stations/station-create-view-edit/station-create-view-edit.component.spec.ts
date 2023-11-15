import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationCreateViewEditComponent } from './station-create-view-edit.component';

describe('StationCreateViewEditComponent', () => {
  let component: StationCreateViewEditComponent;
  let fixture: ComponentFixture<StationCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

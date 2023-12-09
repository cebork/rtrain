import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationManagementHomeComponent } from './station-management-home.component';

describe('StationManagementHomeComponent', () => {
  let component: StationManagementHomeComponent;
  let fixture: ComponentFixture<StationManagementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationManagementHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

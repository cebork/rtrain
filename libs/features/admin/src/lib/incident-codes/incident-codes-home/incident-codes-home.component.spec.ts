import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentCodesHomeComponent } from './incident-codes-home.component';

describe('IncidentCodesHomeComponent', () => {
  let component: IncidentCodesHomeComponent;
  let fixture: ComponentFixture<IncidentCodesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentCodesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentCodesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

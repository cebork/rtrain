import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentCodesCreateViewEditComponent } from './incident-codes-create-view-edit.component';

describe('IncidentCodesCreateViewEditComponent', () => {
  let component: IncidentCodesCreateViewEditComponent;
  let fixture: ComponentFixture<IncidentCodesCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentCodesCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentCodesCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

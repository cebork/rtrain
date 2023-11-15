import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportCompanyCreateViewEditComponent } from './transport-company-create-view-edit.component';

describe('TransportCompanyCreateViewEditComponent', () => {
  let component: TransportCompanyCreateViewEditComponent;
  let fixture: ComponentFixture<TransportCompanyCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportCompanyCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransportCompanyCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

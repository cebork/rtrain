import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportCompaniesHomeComponent } from './transport-companies-home.component';

describe('TransportCompaniesHomeComponent', () => {
  let component: TransportCompaniesHomeComponent;
  let fixture: ComponentFixture<TransportCompaniesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransportCompaniesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransportCompaniesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

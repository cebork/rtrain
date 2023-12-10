import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmsHomeComponent } from './firms-home.component';

describe('FirmsHomeComponent', () => {
  let component: FirmsHomeComponent;
  let fixture: ComponentFixture<FirmsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirmsHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

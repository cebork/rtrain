import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmsCreateViewEditComponent } from './firms-create-view-edit.component';

describe('FirmsCreateViewEditComponent', () => {
  let component: FirmsCreateViewEditComponent;
  let fixture: ComponentFixture<FirmsCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirmsCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FirmsCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

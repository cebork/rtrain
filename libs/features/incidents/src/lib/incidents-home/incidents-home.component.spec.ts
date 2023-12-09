import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentsHomeComponent } from './incidents-home.component';

describe('IncidentsHomeComponent', () => {
  let component: IncidentsHomeComponent;
  let fixture: ComponentFixture<IncidentsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentsHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

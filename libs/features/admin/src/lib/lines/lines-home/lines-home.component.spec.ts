import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinesHomeComponent } from './lines-home.component';

describe('LinesHomeComponent', () => {
  let component: LinesHomeComponent;
  let fixture: ComponentFixture<LinesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinesHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

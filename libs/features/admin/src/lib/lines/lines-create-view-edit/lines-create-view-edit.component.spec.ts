import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinesCreateViewEditComponent } from './lines-create-view-edit.component';

describe('LinesCreateViewEditComponent', () => {
  let component: LinesCreateViewEditComponent;
  let fixture: ComponentFixture<LinesCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinesCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinesCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

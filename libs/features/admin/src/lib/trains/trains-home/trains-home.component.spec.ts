import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainsHomeComponent } from './trains-home.component';

describe('TrainsHomeComponent', () => {
  let component: TrainsHomeComponent;
  let fixture: ComponentFixture<TrainsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainsHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

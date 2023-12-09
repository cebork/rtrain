import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearIncidentsViewComponent } from './near-incidents-view.component';

describe('NearIncidentsViewComponent', () => {
  let component: NearIncidentsViewComponent;
  let fixture: ComponentFixture<NearIncidentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearIncidentsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NearIncidentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

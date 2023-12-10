import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearIncidentsLineViewComponent } from './near-incidents-line-view.component';

describe('NearIncidentsViewComponent', () => {
  let component: NearIncidentsLineViewComponent;
  let fixture: ComponentFixture<NearIncidentsLineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearIncidentsLineViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NearIncidentsLineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

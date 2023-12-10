import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearIncidentsLocalRoutesComponent } from './near-incidents-local-routes.component';

describe('NearIncidentsLocalRoutesComponent', () => {
  let component: NearIncidentsLocalRoutesComponent;
  let fixture: ComponentFixture<NearIncidentsLocalRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NearIncidentsLocalRoutesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NearIncidentsLocalRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

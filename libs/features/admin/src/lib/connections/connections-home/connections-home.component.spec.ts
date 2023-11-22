import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionsHomeComponent } from './connections-home.component';

describe('ConnectionsHomeComponent', () => {
  let component: ConnectionsHomeComponent;
  let fixture: ComponentFixture<ConnectionsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionsHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

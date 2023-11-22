import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionsCreateViewEditComponent } from './connections-create-view-edit.component';

describe('ConnectionsCreateViewEditComponent', () => {
  let component: ConnectionsCreateViewEditComponent;
  let fixture: ComponentFixture<ConnectionsCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectionsCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionsCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

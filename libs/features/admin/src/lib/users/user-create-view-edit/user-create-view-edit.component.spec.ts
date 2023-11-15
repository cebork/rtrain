import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateViewEditComponent } from './user-create-view-edit.component';

describe('UserCreateViewEditComponent', () => {
  let component: UserCreateViewEditComponent;
  let fixture: ComponentFixture<UserCreateViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateViewEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

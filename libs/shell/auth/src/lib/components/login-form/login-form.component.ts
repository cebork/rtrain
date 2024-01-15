import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountModel, ILoginModel, LoginModel} from "@rtrain/domain/models";
import {AuthState, getLoginError} from "@rtrain/shell/auth";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rtrain-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output()
  submitPass = new EventEmitter<ILoginModel>()

  error$: Observable<any>;
  error: any;

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  constructor(
    private store: Store<AuthState>
  ) {
    this.error$ = this.store.select(getLoginError);
    this.error$.subscribe(acc => {
      if (acc) this.error = acc;
    })
  }

  login(): void {
    this.submitPass.emit(
      new LoginModel(
        this.loginForm.value.username!,
        this.loginForm.value.password!,
        false
      )
    )
  }
}

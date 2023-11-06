import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ILoginModel, LoginModel} from "@rtrain/domain/models";

@Component({
  selector: 'rtrain-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output()
  submitPass = new EventEmitter<ILoginModel>()

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

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

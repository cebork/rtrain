import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import { AuthState} from "@rtrain/shell/auth";

@Component({
  selector: 'rtrain-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css'],
})
export class CreatePasswordComponent {
  constructor(
    private store: Store<AuthState>
  ) {}
}

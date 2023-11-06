import { Component } from '@angular/core';
import { ILoginModel } from "@rtrain/domain/models";
import {AccountService} from "@rtrain/api";
import {Store} from "@ngrx/store";
import * as authActions from "@rtrain/shell/auth";
import {Route, Router} from "@angular/router";
import {AuthActionTypes, AuthState} from "@rtrain/shell/auth";

@Component({
  selector: 'rtrain-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(
    private accountService: AccountService,
    private store: Store<AuthState>,
    private route: Router
  ) {
      if (route.url.includes("logout")) {
        this.store.dispatch(new authActions.Logout());
        this.route.navigate(["auth/login"]);
        this.accountService.logout();

      }

  }

  login($event: ILoginModel) {
    this.store.dispatch({type: AuthActionTypes.Login, payload: $event})
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { authRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "@rtrain/api";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { authReducer, initialState as authInitialState } from "./+state/auth.reducer";
import { AuthEffects } from "./+state/auth.effects";
import { EffectsModule } from "@ngrx/effects";
import {AuthInterceptor} from "../../../../api/interceptors/auth.interceptor";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature("auth", authReducer, {initialState: authInitialState}),
    EffectsModule.forFeature([AuthEffects])

  ],
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AccountService,
    AuthEffects,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class ShellAuthModule {}

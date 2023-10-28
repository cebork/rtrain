import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login/login.component';
import { authRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AccountService} from "@rtrain/api";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), ReactiveFormsModule, HttpClientModule],
  declarations: [LoginComponent, LoginFormComponent],
  exports: [RouterModule],
  providers: [AccountService]
})
export class ShellAuthModule {}

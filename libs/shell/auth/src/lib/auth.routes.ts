import { Route } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";
import {CreatePasswordComponent} from "./containers/create-password/create-password.component";

export const authRoutes: Route[] = [
  {
    path: "auth",
    children: [
      {
        path: "",
        redirectTo: "logout",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "logout",
        component: LoginComponent,
      },
      {
        path: "activateAccount/:activationCode",
        component: CreatePasswordComponent
      }
    ],
  },
];

import { Route } from "@angular/router";
import { LoginComponent } from "./containers/login/login.component";

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
    ],
  },
];

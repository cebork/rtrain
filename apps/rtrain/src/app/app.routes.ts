import { Route } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {AuthGuard} from "@rtrain/shell/auth";

export const appRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: HomeComponent,
  },
];

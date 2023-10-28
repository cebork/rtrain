import { Route } from '@angular/router';
import { HomeComponent } from "./home/home.component";

export const appRoutes: Route[] = [
  {
    path: "",
    pathMatch: "full",
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: HomeComponent,
  },
];

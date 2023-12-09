import {Route} from "@angular/router";
import {IncidentsHomeComponent} from "./incidents-home/incidents-home.component";
import {AuthGuard} from "@rtrain/shell/auth";

export const incidentsRoutes: Route[] = [
  {
    path: "incidents-home",
    component: IncidentsHomeComponent,
    canActivate: [AuthGuard]
  }
]

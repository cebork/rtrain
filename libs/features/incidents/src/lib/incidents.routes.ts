import {Route} from "@angular/router";
import {IncidentsHomeComponent} from "./incidents-home/incidents-home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {IncidentsTrainViewComponent} from "./incidents-train-view/incidents-train-view.component";

export const incidentsRoutes: Route[] = [
  {
    path: "incidents-home",
    component: IncidentsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "incident-train-view/:incidentId",
    component: IncidentsTrainViewComponent,
    canActivate: [AuthGuard]
  }
]

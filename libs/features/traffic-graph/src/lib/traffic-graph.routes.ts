import {Route} from "@angular/router";
import {TrafficLinesViewComponent} from "./traffic-lines-view/traffic-lines-view.component";
import {AuthGuard} from "@rtrain/shell/auth";

export const trafficGraphRoutes: Route[] = [
  {
    path: "traffic-lines-view",
    component: TrafficLinesViewComponent,
    canActivate: [AuthGuard]
  }
]

import {Route} from "@angular/router";
import {TrafficLinesViewComponent} from "./traffic-lines-view/traffic-lines-view.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {TrafficGraphForLineComponent} from "./traffic-graph-for-line/traffic-graph-for-line.component";

export const trafficGraphRoutes: Route[] = [
  {
    path: "traffic-lines-view",
    component: TrafficLinesViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "traffic-graph-for-line/:lineId",
    component: TrafficGraphForLineComponent,
    canActivate: [AuthGuard]
  }
]

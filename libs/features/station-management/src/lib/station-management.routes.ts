import {StationManagementHomeComponent} from "./station-management-home/station-management-home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {RealtimeScheduleViewComponent} from "./realtime-schedule-view/realtime-schedule-view.component";
import {NearIncidentsLineViewComponent} from "./near-incidents-line-view/near-incidents-line-view.component";
import {Route} from "@angular/router";
import {NearIncidentsLocalRoutesComponent} from "./near-incidents-local-routes/near-incidents-local-routes.component";

export const stationManagementRoutes: Route[] = [
  {
    path: "station-management",
    component: StationManagementHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "station-management/realtime-schedule",
    component: RealtimeScheduleViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "station-management/near-incidents-lines",
    component: NearIncidentsLineViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "station-management/near-incidents-local-routes/:lineId",
    component: NearIncidentsLocalRoutesComponent,
    canActivate: [AuthGuard]
  }
]

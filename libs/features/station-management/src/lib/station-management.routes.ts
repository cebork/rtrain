import {StationManagementHomeComponent} from "./station-management-home/station-management-home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {RealtimeScheduleViewComponent} from "./realtime-schedule-view/realtime-schedule-view.component";
import {NearIncidentsViewComponent} from "./near-incidents-view/near-incidents-view.component";
import {Route} from "@angular/router";

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
    path: "station-management/near-incidents",
    component: NearIncidentsViewComponent,
    canActivate: [AuthGuard]
  }
]

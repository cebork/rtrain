import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationManagementHomeComponent } from './station-management-home/station-management-home.component';
import { RealtimeScheduleViewComponent } from './realtime-schedule-view/realtime-schedule-view.component';
import { NearIncidentsViewComponent } from './near-incidents-view/near-incidents-view.component';
import {UtilModule} from "@rtrain/util";
import {RouterModule} from "@angular/router";
import {TableModule} from "primeng/table";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import {stationManagementRoutes} from "./station-management.routes";
import {RealtimeTrainScheduleService} from "@rtrain/api";
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";

@NgModule({
  imports: [
    UtilModule,
    CommonModule,
    RouterModule.forChild(stationManagementRoutes),
    TableModule,
    FontAwesomeModule,
    CalendarModule,
    FormsModule,
    PaginatorModule,
  ],
  declarations: [
    StationManagementHomeComponent,
    RealtimeScheduleViewComponent,
    NearIncidentsViewComponent,
  ],
  providers: [
    RealtimeTrainScheduleService
  ]
})
export class FeaturesStationManagementModule {}

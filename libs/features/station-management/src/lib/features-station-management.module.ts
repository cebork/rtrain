import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationManagementHomeComponent } from './station-management-home/station-management-home.component';
import { RealtimeScheduleViewComponent } from './realtime-schedule-view/realtime-schedule-view.component';
import { NearIncidentsLineViewComponent } from './near-incidents-line-view/near-incidents-line-view.component';
import { UtilModule } from '@rtrain/util';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { stationManagementRoutes } from './station-management.routes';
import {IncidentService, RealtimeTrainScheduleService, SignalRService} from '@rtrain/api';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { NearIncidentsLocalRoutesComponent } from './near-incidents-local-routes/near-incidents-local-routes.component';
import {BadgeModule} from "primeng/badge";
import {DialogModule} from "primeng/dialog";

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
        BadgeModule,
        DialogModule,
    ],
  declarations: [
    StationManagementHomeComponent,
    RealtimeScheduleViewComponent,
    NearIncidentsLineViewComponent,
    NearIncidentsLocalRoutesComponent,
  ],
  providers: [RealtimeTrainScheduleService, IncidentService],
})
export class FeaturesStationManagementModule {}

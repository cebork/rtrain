import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsHomeComponent } from './incidents-home/incidents-home.component';
import { RouterModule } from '@angular/router';
import { incidentsRoutes } from './incidents.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { UtilModule } from '@rtrain/util';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { IncidentsTrainViewComponent } from './incidents-train-view/incidents-train-view.component';
import {DelayDescriptionService} from "@rtrain/api";
import {BadgeModule} from "primeng/badge";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(incidentsRoutes),
    FontAwesomeModule,
    SharedModule,
    TableModule,
    UtilModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    BadgeModule,
  ],
  declarations: [IncidentsHomeComponent, IncidentsTrainViewComponent],
  providers: [DelayDescriptionService]
})
export class FeaturesIncidentsModule {}

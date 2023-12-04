import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainSheduleHomeComponent } from './train-schedule-home/train-shedule-home.component';
import { RouterModule } from '@angular/router';
import { trainScheduleRoutes } from './train-schedule.routes';
import { UtilModule } from '@rtrain/util';
import { FeaturesAdminModule } from '@rtrain/features/admin';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrainPassingViewComponent } from './train-passing-view/train-passing-view.component';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import {TrainForScheduleService, TrainScheduleService} from '@rtrain/api';
import { TrainScheduleCreationViewComponent } from './train-schedule-creation-view/train-schedule-creation-view.component';
import { TrainScheduleCreationComponent } from './train-schedule-creation/train-schedule-creation.component';
import {CalendarModule} from "primeng/calendar";

@NgModule({
  imports: [
    UtilModule,
    CommonModule,
    RouterModule.forChild(trainScheduleRoutes),
    FeaturesAdminModule,
    TableModule,
    FontAwesomeModule,
    BadgeModule,
    DialogModule,
    FormsModule,
    PaginatorModule,
    CalendarModule,
  ],
  declarations: [
    TrainSheduleHomeComponent,
    TrainPassingViewComponent,
    TrainScheduleCreationViewComponent,
    TrainScheduleCreationComponent,
  ],
  providers: [TrainForScheduleService, TrainScheduleService],
})
export class FeaturesTrainScheduleModule {}

import {Route} from "@angular/router";
import {TrainSheduleHomeComponent} from "./train-schedule-home/train-shedule-home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {TrainPassingViewComponent} from "./train-passing-view/train-passing-view.component";
import {
  TrainScheduleCreationViewComponent
} from "./train-schedule-creation-view/train-schedule-creation-view.component";
import {TrainScheduleCreationComponent} from "./train-schedule-creation/train-schedule-creation.component";


export const trainScheduleRoutes: Route[] = [
  {
    path: "train-schedule",
    component: TrainSheduleHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "train-schedule/train-passing/:lineID",
    component: TrainPassingViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "train-schedule/creation/:lineID",
    component: TrainScheduleCreationViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "train-schedule/creation/:lineID/:trainId",
    component: TrainScheduleCreationComponent,
    canActivate: [AuthGuard]
  }
]

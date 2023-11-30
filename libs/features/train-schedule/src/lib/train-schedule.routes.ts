import {Route} from "@angular/router";
import {TrainSheduleHomeComponent} from "./train-schedule-home/train-shedule-home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {TrainPassingViewComponent} from "./train-passing-view/train-passing-view.component";


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
  }
]

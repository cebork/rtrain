import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLinesViewComponent } from './traffic-lines-view/traffic-lines-view.component';
import {RouterModule} from "@angular/router";
import {trafficGraphRoutes} from "./traffic-graph.routes";
import {UtilModule} from "@rtrain/util";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(trafficGraphRoutes),
    UtilModule
  ],
  declarations: [
    TrafficLinesViewComponent,
    TrafficLinesViewComponent
  ],
})
export class FeaturesTrafficGraphModule {}

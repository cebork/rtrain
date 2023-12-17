import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficLinesViewComponent } from './traffic-lines-view/traffic-lines-view.component';
import { RouterModule } from '@angular/router';
import { trafficGraphRoutes } from './traffic-graph.routes';
import { UtilModule } from '@rtrain/util';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { UtilService } from '@rtrain/api';
import { TrafficGraphForLineComponent } from './traffic-graph-for-line/traffic-graph-for-line.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(trafficGraphRoutes),
    UtilModule,
    FontAwesomeModule,
    SharedModule,
    TableModule,
  ],
  declarations: [
    TrafficLinesViewComponent,
    TrafficLinesViewComponent,
    TrafficGraphForLineComponent,
  ],
  providers: [UtilService],
})
export class FeaturesTrafficGraphModule {}

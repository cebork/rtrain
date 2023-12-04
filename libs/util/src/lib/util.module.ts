import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficGraphComponent } from './traffic-graph/traffic-graph.component';
import {RtrainHasAuthorityDirective} from "./directives/rtrainHasAuthorityDirective";

@NgModule({
    imports: [CommonModule],
    declarations: [
      TrafficGraphComponent,
      RtrainHasAuthorityDirective
    ],
    exports: [
      TrafficGraphComponent,
      RtrainHasAuthorityDirective
    ]
})
export class UtilModule {}

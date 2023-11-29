import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrafficGraphComponent } from './traffic-graph/traffic-graph.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TrafficGraphComponent],
    exports: [
        TrafficGraphComponent
    ]
})
export class UtilModule {}

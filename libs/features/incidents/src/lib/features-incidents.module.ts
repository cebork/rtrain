import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsHomeComponent } from './incidents-home/incidents-home.component';
import {RouterModule} from "@angular/router";
import {incidentsRoutes} from "./incidents.routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(incidentsRoutes)
  ],
  declarations: [
    IncidentsHomeComponent
  ],
})
export class FeaturesIncidentsModule {}

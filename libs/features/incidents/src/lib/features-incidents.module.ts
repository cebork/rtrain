import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsHomeComponent } from './incidents-home/incidents-home.component';
import {RouterModule} from "@angular/router";
import {incidentsRoutes} from "./incidents.routes";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {UtilModule} from "@rtrain/util";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(incidentsRoutes),
        FontAwesomeModule,
        SharedModule,
        TableModule,
        UtilModule
    ],
  declarations: [
    IncidentsHomeComponent
  ],
})
export class FeaturesIncidentsModule {}

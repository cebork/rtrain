import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { MenuModule } from 'primeng/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { UsersHomeComponent } from './users/users-home/users-home.component';
import {
  IncidentCodeService,
  LocalRouteService,
  RoleService,
  StationService,
  TrainTypeService,
  TransportCompanyService,
  UserService,
  LineService, TrainService,
} from '@rtrain/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { UserCreateViewEditComponent } from './users/user-create-view-edit/user-create-view-edit.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TransportCompaniesHomeComponent } from './transport-companies/transport-companies-home/transport-companies-home.component';
import { TransportCompanyCreateViewEditComponent } from './transport-companies/transport-company-create-view-edit/transport-company-create-view-edit.component';
import { StationCreateViewEditComponent } from './stations/station-create-view-edit/station-create-view-edit.component';
import { StationHomeComponent } from './stations/station-home/station-home.component';
import { LinesHomeComponent } from './lines/lines-home/lines-home.component';
import { LinesCreateViewEditComponent } from './lines/lines-create-view-edit/lines-create-view-edit.component';
import { ConnectionsCreateViewEditComponent } from './connections/connections-create-view-edit/connections-create-view-edit.component';
import { ConnectionsHomeComponent } from './connections/connections-home/connections-home.component';
import { TrainTypesHomeComponent } from './train-types/train-types-home/train-types-home.component';
import { TrainTypesCreateViewEditComponent } from './train-types/train-types-create-view-edit/train-types-create-view-edit.component';
import { IncidentCodesCreateViewEditComponent } from './incident-codes/incident-codes-create-view-edit/incident-codes-create-view-edit.component';
import { IncidentCodesHomeComponent } from './incident-codes/incident-codes-home/incident-codes-home.component';
import { TrainsHomeComponent } from './trains/trains-home/trains-home.component';
import { TrainsCreateViewEditComponent } from './trains/trains-create-view-edit/trains-create-view-edit.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MenuModule,
    FontAwesomeModule,
    TableModule,
    BadgeModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
  ],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    UsersHomeComponent,
    UserCreateViewEditComponent,
    TransportCompaniesHomeComponent,
    TransportCompanyCreateViewEditComponent,
    StationCreateViewEditComponent,
    StationHomeComponent,
    LinesHomeComponent,
    LinesCreateViewEditComponent,
    ConnectionsCreateViewEditComponent,
    ConnectionsHomeComponent,
    TrainTypesHomeComponent,
    TrainTypesCreateViewEditComponent,
    IncidentCodesCreateViewEditComponent,
    IncidentCodesHomeComponent,
    TrainsHomeComponent,
    TrainsCreateViewEditComponent,
  ],
  providers: [
    UserService,
    TransportCompanyService,
    RoleService,
    StationService,
    LineService,
    LocalRouteService,
    TrainTypeService,
    IncidentCodeService,
    TrainService
  ],
})
export class FeaturesAdminModule {}

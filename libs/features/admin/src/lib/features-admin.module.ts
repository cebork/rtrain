import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin.routes';
import { MenuModule } from 'primeng/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrainsComponent } from './trains/trains.component';
import { TableModule } from 'primeng/table';
import { UsersHomeComponent } from './users/users-home/users-home.component';
import {RoleService, StationService, TransportCompanyService, UserService} from '@rtrain/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { UserCreateViewEditComponent } from './users/user-create-view-edit/user-create-view-edit.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TransportCompaniesHomeComponent } from './transport-companies/transport-companies-home/transport-companies-home.component';
import { TransportCompanyCreateViewEditComponent } from './transport-companies/transport-company-create-view-edit/transport-company-create-view-edit.component';
import { StationCreateViewEditComponent } from './stations/station-create-view-edit/station-create-view-edit.component';
import { StationHomeComponent } from './stations/station-home/station-home.component';
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
    TrainsComponent,
    UsersHomeComponent,
    UserCreateViewEditComponent,
    TransportCompaniesHomeComponent,
    TransportCompanyCreateViewEditComponent,
    StationCreateViewEditComponent,
    StationHomeComponent,
  ],
  providers: [UserService, TransportCompanyService, RoleService, StationService],
})
export class FeaturesAdminModule {}

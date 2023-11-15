import { Route } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "@rtrain/shell/auth";
import {TrainsComponent} from "./trains/trains.component";
import {UsersHomeComponent} from "./users/users-home/users-home.component";
import {UserCreateViewEditComponent} from "./users/user-create-view-edit/user-create-view-edit.component";
import {
  TransportCompaniesHomeComponent
} from "./transport-companies/transport-companies-home/transport-companies-home.component";
import {
  TransportCompanyCreateViewEditComponent
} from "./transport-companies/transport-company-create-view-edit/transport-company-create-view-edit.component";
import {StationHomeComponent} from "./stations/station-home/station-home.component";
import {StationCreateViewEditComponent} from "./stations/station-create-view-edit/station-create-view-edit.component";


export const adminRoutes: Route[] = [
  {
    path: "admin",
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "admin/trains",
    component: TrainsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/users",
    component: UsersHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/users/create",
    component: UserCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/users/edit/:id",
    component: UserCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/users/view/:id",
    component: UserCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/transport-companies",
    component: TransportCompaniesHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/transport-companies/create",
    component: TransportCompanyCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/transport-companies/edit/:id",
    component: TransportCompanyCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/transport-companies/view/:id",
    component: TransportCompanyCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/stations",
    component: StationHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/stations/create",
    component: StationCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/stations/edit/:id",
    component: StationCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/stations/view/:id",
    component: StationCreateViewEditComponent,
    canActivate: [AuthGuard]
  }
];

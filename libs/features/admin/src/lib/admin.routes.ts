import { Route } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "@rtrain/shell/auth";
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
import {LinesHomeComponent} from "./lines/lines-home/lines-home.component";
import {LinesCreateViewEditComponent} from "./lines/lines-create-view-edit/lines-create-view-edit.component";
import {ConnectionsHomeComponent} from "./connections/connections-home/connections-home.component";
import {
  ConnectionsCreateViewEditComponent
} from "./connections/connections-create-view-edit/connections-create-view-edit.component";
import {TrainTypesHomeComponent} from "./train-types/train-types-home/train-types-home.component";
import {
  TrainTypesCreateViewEditComponent
} from "./train-types/train-types-create-view-edit/train-types-create-view-edit.component";
import {IncidentCodesHomeComponent} from "./incident-codes/incident-codes-home/incident-codes-home.component";
import {
  IncidentCodesCreateViewEditComponent
} from "./incident-codes/incident-codes-create-view-edit/incident-codes-create-view-edit.component";
import {TrainsHomeComponent} from "./trains/trains-home/trains-home.component";
import {TrainsCreateViewEditComponent} from "./trains/trains-create-view-edit/trains-create-view-edit.component";
import {FirmsHomeComponent} from "./firms/firms-home/firms-home.component";
import {FirmsCreateViewEditComponent} from "./firms/firms-create-view-edit/firms-create-view-edit.component";
import {ProfilePageComponent} from "./profile-page/profile-page.component";


export const adminRoutes: Route[] = [
  {
    path: "admin",
    component: HomeComponent,
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
  },
  {
    path: "admin/lines",
    component: LinesHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/lines/create",
    component: LinesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/lines/edit/:id",
    component: LinesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/lines/view/:id",
    component: LinesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/connections",
    component: ConnectionsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/connections/create",
    component: ConnectionsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/connections/edit/:id",
    component: ConnectionsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/connections/view/:id",
    component: ConnectionsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/train-types",
    component: TrainTypesHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/train-types/create",
    component: TrainTypesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/train-types/edit/:id",
    component: TrainTypesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/train-types/view/:id",
    component: TrainTypesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/incident-codes",
    component: IncidentCodesHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/incident-codes/create",
    component: IncidentCodesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/incident-codes/edit/:id",
    component: IncidentCodesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/incident-codes/view/:id",
    component: IncidentCodesCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/trains",
    component: TrainsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/trains/create",
    component: TrainsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/trains/edit/:id",
    component: TrainsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/trains/view/:id",
    component: TrainsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/firms",
    component: FirmsHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/firms/create",
    component: FirmsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/firms/edit/:id",
    component: FirmsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/firms/view/:id",
    component: FirmsCreateViewEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile-page",
    component: ProfilePageComponent,
    canActivate: [AuthGuard]
  }
];

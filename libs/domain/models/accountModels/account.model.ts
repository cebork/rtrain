import {IRoleModel} from "../roleModels/role.model";
import {active} from "d3";
import {ITransportCompanyModel} from "../transportCompanyModels/transport-company.model";
import {IStationModel} from "../stationModels/station.model";

export interface IAccountModel {
    // email: string;
    // password: string;
    // image?: string;
    // firstName: string;
    // lastName: string;
    // jobPosition: string;

  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
  transportCompanyId?: string;
  transportCompany?: ITransportCompanyModel;
  email?: string;
  phoneNumber?: string
  emailConfirmed?: boolean;
  active?: boolean;
  roles?: IRoleModel[];
  stationId?: string;
  station?: IStationModel;
}

export class AccountModel implements IAccountModel {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
  transportCompanyId?: string;
  transportCompany?: ITransportCompanyModel;
  email?: string;
  phoneNumber?: string
  emailConfirmed?: boolean;
  active?: boolean;
  image?: string;
  roles?: IRoleModel[];
  stationId?: string;
  station?: IStationModel;

  constructor(id?: string, userName?: string, firstName?: string, lastName?: string, jobPosition?: string,
              transportCompanyId?: string, email?: string, phoneNumber?: string, emailConfirmed?: boolean,
              active?: boolean, roles?: IRoleModel[], transportCompany?: ITransportCompanyModel, stationId?: string,
              station?: IStationModel
  ) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobPosition = jobPosition;
    this.transportCompanyId = transportCompanyId;
    this.transportCompany = transportCompany;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.emailConfirmed = emailConfirmed;
    this.active = active;
    this.roles = roles;
    this.stationId = stationId;
    this.station = station;
  }
}

import {IRoleModel} from "../roleModels/role.model";
import {ITransportCompanyModel} from "../transportCompanyModels/transport-company.model";
import {IStationModel} from "../stationModels/station.model";
import {IFirmModel} from "../firmModels/firm.model";

export interface IAccountModel {
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
  firmId?: string;
  firm?: IFirmModel
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
  firmId?: string;
  firm?: IFirmModel

  constructor(id?: string, userName?: string, firstName?: string, lastName?: string, jobPosition?: string,
              transportCompanyId?: string, email?: string, phoneNumber?: string, emailConfirmed?: boolean,
              active?: boolean, roles?: IRoleModel[], transportCompany?: ITransportCompanyModel, stationId?: string,
              station?: IStationModel, firmId?: string, firm?: IFirmModel
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
    this.firmId = firmId;
    this.firm = firm;
  }
}

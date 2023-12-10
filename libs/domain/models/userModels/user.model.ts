import {FiltringModel} from "../filtring.model";
import {IRoleModel} from "../roleModels/role.model";
import {IFirmModel} from "../firmModels/firm.model";

export interface IUserModel extends FiltringModel {
  id?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  jobPosition?: string;
  transportCompanyId?: string;
  email?: string;
  phoneNumber?: string
  emailConfirmed?: boolean;
  active?: boolean;
  roles?: IRoleModel[];
  stationId?: string;
  firmId?: string;
  firm?: IFirmModel;
}

export class UserModel implements IUserModel{
  emailConfirmed?: boolean;
  email?: string;
  firstName?: string;
  id?: string;
  jobPosition?: string;
  lastName?: string;
  phoneNumber?: string;
  transportCompanyId?: string;
  active?: boolean;
  roles?: IRoleModel[] = [];
  userName?: string;
  stationId?: string;
  firmId?: string;
  firm?: IFirmModel;

  constructor(
    emailConfirmed?: boolean, email?: string, firstName?: string, id?: string, jobPosition?: string, lastName?: string,
    phoneNumber?: string, transportCompanyId?: string, active?: boolean, userName?: string, stationId?: string,
    firmId?: string, firm?: IFirmModel
  ) {
    this.emailConfirmed = emailConfirmed;
    this.email = email;
    this.firstName = firstName;
    this.id = id;
    this.jobPosition = jobPosition;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.transportCompanyId = transportCompanyId;
    this.active = active;
    this.userName = userName;
    this.stationId = stationId;
    this.firmId = firmId;
    this.firm = firm;
  }
}


import {FiltringModel} from "../filtring.model";
import {IRoleModel} from "../roleModels/role.model";

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

  constructor(emailConfirmed?: boolean, email?: string, firstName?: string, id?: string,
              jobPosition?: string, lastName?: string, phoneNumber?: string,
              transportCompanyId?: string, active?: boolean, userName?: string, stationId?: string) {
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
  }
}


import {IRoleModel} from "../roleModels/role.model";
import {active} from "d3";

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
  email?: string;
  phoneNumber?: string
  emailConfirmed?: boolean;
  active?: boolean;
  roles?: IRoleModel[];

}

export class AccountModel implements IAccountModel {
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
  image?: string;
  roles?: IRoleModel[];


  constructor(id?: string, userName?: string, firstName?: string, lastName?: string, jobPosition?: string, transportCompanyId?: string, email?: string, phoneNumber?: string, emailConfirmed?: boolean, active?: boolean, roles?: IRoleModel[]) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobPosition = jobPosition;
    this.transportCompanyId = transportCompanyId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.emailConfirmed = emailConfirmed;
    this.active = active;
    this.roles = roles;
  }
}

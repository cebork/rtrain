export interface IUserProfileEditDTOModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export class UserProfileEditDTOModel implements IUserProfileEditDTOModel{
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;


  constructor(id?: string, firstName?: string, lastName?: string, phoneNumber?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}

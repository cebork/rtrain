export interface IAccountModel {
  Email: string;
  Password: string;
}

export class AccountModel implements IAccountModel{
  Email: string;
  Password: string;
  
  constructor(Email: string, Password: string) {
    this.Email = Email;
    this.Password = Password;
  }
}

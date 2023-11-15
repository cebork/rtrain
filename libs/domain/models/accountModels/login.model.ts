export interface ILoginModel {
  UserName: string;
  Password: string;
  RememberMe: boolean;
}

export class LoginModel implements ILoginModel{
  UserName: string;
  Password: string;
  RememberMe: boolean = false;

  constructor(Email: string, Password: string, RememberMe: boolean) {
    this.UserName = Email;
    this.Password = Password;
    this.RememberMe = RememberMe;
  }
}

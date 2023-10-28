export interface ILoginModel {
  Email: string;
  Password: string;
  RememberMe: boolean;
}

export class LoginModel implements ILoginModel{
  Email: string;
  Password: string;
  RememberMe: boolean = false;

  constructor(Email: string, Password: string, RememberMe: boolean) {
    this.Email = Email;
    this.Password = Password;
    this.RememberMe = RememberMe;
  }
}

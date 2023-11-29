export interface IActivateAccountModel {
  password?: string;
  confirmPassword?: string;
  activationCode?: string;
}

export class ActivateAccountModel implements IActivateAccountModel{
  activationCode?: string;
  confirmPassword?: string;
  password?: string;


  constructor(confirmPassword?: string, password?: string, activationCode?: string) {
    this.activationCode = activationCode;
    this.confirmPassword = confirmPassword;
    this.password = password;
  }
}

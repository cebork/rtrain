export interface IResetPasswordDTOModel {
  oldPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

export class ResetPasswordDTOModel implements IResetPasswordDTOModel {
  newPassword?: string;
  newPasswordConfirm?: string;
  oldPassword?: string;


  constructor(newPassword?: string, newPasswordConfirm?: string, oldPassword?: string) {
    this.newPassword = newPassword;
    this.newPasswordConfirm = newPasswordConfirm;
    this.oldPassword = oldPassword;
  }
}

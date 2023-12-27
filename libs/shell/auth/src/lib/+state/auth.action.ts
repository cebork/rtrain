import {Action} from "@ngrx/store";
import {AccountModel, ILoginModel} from "@rtrain/domain/models";

export enum AuthActionTypes {
  Login = "[Auth API] Login",
  Logout = "[Auth API] Logout",
  GetAccount = "[Auth API] Get Account",
  StoreAccount = "[Auth API] Set Account",
  SessionRenewed = "[Auth API] Session Renewed",
  LoginSuccess = "[Auth API] Login Success",
  LoginFail = "[Auth API] Login Fail",
  SetLoading = "[Auth API] Set Loading",
  UpdateAccount = "[Auth API] Update Account"
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login
  constructor(public payload: ILoginModel) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class GetAccount implements Action {
  readonly type = AuthActionTypes.GetAccount;
  constructor(public afterLogin?: boolean) {}
}

export class StoreAccount implements Action {
  readonly type = AuthActionTypes.StoreAccount;
  constructor(public account: AccountModel, public afterLogin?: boolean) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: AccountModel) {}
}

export class SessionRenewed implements Action {
  readonly type = AuthActionTypes.SessionRenewed;

  constructor(public payload: AccountModel) {
  }
}
export class LoginFail implements Action {
  readonly type = AuthActionTypes.LoginFail;
  constructor(public payload: any) {}
}

export class SetLoading implements Action {
  readonly type = AuthActionTypes.SetLoading;

  constructor(public payload: boolean) {}
}

export class UpdateAccount implements Action {
  readonly type = AuthActionTypes.UpdateAccount;

  constructor(public payload: AccountModel) {}
}

export type AuthAction = Login | Logout | GetAccount | StoreAccount | LoginFail | LoginSuccess | SessionRenewed | SetLoading | UpdateAccount;

import {AccountModel} from "@rtrain/domain/models";
import {AuthAction, AuthActionTypes} from "./auth.action";


export interface AuthData {
  loading: boolean;
  account: AccountModel | null;
  error: "";
}

export interface AuthState {
  readonly auth: AuthData;
}

export const initialState: AuthData = {
  error: "",
  account: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthAction): AuthData {
  switch (action.type) {
    case AuthActionTypes.Login:
      return { ...state, loading: true }

    case AuthActionTypes.Logout:
      return { ...state, loading: false, account: null, error: ''}

    case AuthActionTypes.GetAccount: {
      return { ...state, loading: true };
    }

    case AuthActionTypes.StoreAccount: {
      return { ...state, account: action.account, loading: false };
    }

    case AuthActionTypes.LoginSuccess: {
      return { ...state, loading: false };
    }

    case AuthActionTypes.LoginFail: {
      return { ...state, account: null, loading: false, error: action.payload };
    }

    case AuthActionTypes.SetLoading: {
      return { ...state, loading: action.payload}
    }

    case AuthActionTypes.SessionRenewed: {
      return { ...state, account: action.payload}
    }

    case AuthActionTypes.UpdateAccount: {
      return { ...state, account: action.payload}
    }

    default:
      return state;
  }
}

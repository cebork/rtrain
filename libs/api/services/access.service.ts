import {map, Observable} from "rxjs";
import {AccountModel, IRoleModel} from "../../domain/models";
import {Store} from "@ngrx/store";
import {AuthState, getAccount} from "../../shell/auth/src";
import {Injectable} from "@angular/core";

@Injectable()
export class AccessService {
  account$: Observable<AccountModel | null>;

  constructor(private store: Store<AuthState>) {
    this.account$ = this.store.select(getAccount);
  }

  hasAnyAuthority(roles: string[]): Observable<boolean> {
    return this.account$.pipe(
      map((account: AccountModel | null) => {
        return account?.roles;
      }),
      map((accountRoles: any[] | undefined) => {
        if (accountRoles) {
          return accountRoles.some(role => roles.includes(role));
        }
        return false;
      })
    );
  }
}

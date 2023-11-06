import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AuthState} from "../+state/auth.reducer";
import {Observable, of, switchMap} from "rxjs";
import * as authActions from "@rtrain/shell/auth";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private router: Router, private store: Store<AuthState>) {}
  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select((state) => state.auth.account),
      switchMap((account) => {
        if (account) return of(true);

        const isToken = sessionStorage.getItem("authToken") || localStorage.getItem("authToken");

        if (isToken) {
          this.store.dispatch(new authActions.GetAccount(false));
          return of(true);
        } else {
          this.router.navigate(["/auth/login"]);
          return of(false);
        }
      })
    );
  }
}

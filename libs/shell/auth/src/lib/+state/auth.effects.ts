import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, mergeMap, of, switchMap, tap} from "rxjs";
import * as authActions from "./auth.action";
import {AuthActionTypes} from "./auth.action";
import {AccountService} from "@rtrain/api";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.Login),
      exhaustMap((action: authActions.Login) =>
        this.accountService.login(action.payload).pipe(
          map(token => new authActions.GetAccount(true)),
          catchError(err => of(new authActions.LoginFail(err)))
        )
      )
    )
  );

  getAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.GetAccount),
      exhaustMap((action: authActions.GetAccount) =>
        this.accountService.getAccount().pipe(
          map((account) => new authActions.StoreAccount(account, action.afterLogin)),
          catchError((error) => of(new authActions.LoginFail(error)))
        )
      )
    )
  );

  storeAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.StoreAccount),
      switchMap((action: authActions.StoreAccount) =>
        of(action).pipe(
          map((account) =>
            (action.afterLogin ? new authActions.LoginSuccess(action.account) : new authActions.SessionRenewed(action.account) ))
        )
      )
    )
  );

  sessionRenewed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SessionRenewed),
      exhaustMap((action: authActions.SessionRenewed) =>
        of(action).pipe(
          mergeMap((account) => {
            const routeAuthorities = this.getRouteAuthorities();
            // if (routeAuthorities && account && account.authorities && !account.authorities.some(authority => routeAuthorities.includes(authority))) {
            //   this.router.navigate(['accessdenied']);
            // }
            return of(new authActions.SetLoading(false));
          })
        )
      )
    )
  );

  loginSucces$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        map((action: authActions.LoginSuccess) => action.payload),
        tap(() => this.router.navigate([`/`]))
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.LoginFail),
        tap(() => this.router.navigate([`/auth/login`]))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  private getLastActivatedRouteWithData(routeSnapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot | null {
    let lastRoute = routeSnapshot;
    while (lastRoute.firstChild) {
      lastRoute = lastRoute.firstChild;
    }
    return lastRoute.data && (Object.keys(lastRoute.data).length > 0) ? lastRoute : null;
  }

  private getRouteAuthorities(): string[] | undefined {
    const root = this.activatedRoute.snapshot;
    const deepestRoute = this.getLastActivatedRouteWithData(root);
    return deepestRoute?.data['authorities'];
  }
}

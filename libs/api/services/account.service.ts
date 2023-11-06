import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AccountModel, IAccountModel, ILoginModel, JWTToken} from "../../domain/models";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";


@Injectable()
export class AccountService {
  private baseURL = `${apiAddress}/api/account`
  public tokenSubject$ = new BehaviorSubject<string | null>(null);
  public accountSubject$ = new BehaviorSubject<AccountModel | null>(null);
  constructor(private http: HttpClient) {}

  login(loginModel: ILoginModel): Observable<string>{
    return this.http.post(`${this.baseURL}/login`, loginModel, { responseType: 'json', observe: 'response' })
      .pipe(
        map(response => {
          const jwt: JWTToken = response.body as JWTToken;
          return jwt.token;
        }),
        tap((token: string) => {
          if (loginModel.RememberMe) {
            localStorage.setItem("authToken", token);
          } else {
            sessionStorage.setItem("authToken", token);
          }
          this.tokenSubject$.next(token);
        }),
        catchError(error => {
          console.error('Error during login:', error);
          return throwError(error);
        })
      );
  }

  getAccount(): Observable<AccountModel> {
    return this.http.get<AccountModel>(`${this.baseURL}/getCurrentUser`).pipe(
      tap((account: IAccountModel) => {
        this.accountSubject$.next(account);
      })
    )
  }

  logout(): void {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    this.accountSubject$.next(null);
  }
}

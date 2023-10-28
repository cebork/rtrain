import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ILoginModel} from "../../domain/models";
import {Observable} from "rxjs";


@Injectable()
export class AccountService {
  private baseURL = `${apiAddress}/api/account`

  constructor(private http: HttpClient) {}

  login(loginModel: ILoginModel): Observable<HttpResponse<any>>{
    return this.http.post<any>(`${this.baseURL}/login`, loginModel, {responseType: 'json', observe: 'response'});
  }
}

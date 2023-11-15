import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRoleModel} from "../../domain/models/roleModels/role.model";


@Injectable()
export class RoleService {
  private baseURL = `${apiAddress}/api/Role`
  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<HttpResponse<IRoleModel[]>>{
    return this.http.get<IRoleModel[]>(`${this.baseURL}/GetAll`, {observe: 'response', responseType: "json"})
  }
}

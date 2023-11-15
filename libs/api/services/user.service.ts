import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserModel} from "../../domain/models";
import {Injectable} from "@angular/core";
import {IGenericGetAllModelModel} from "../../domain/models/generic-GetAll-Model.model";
import {ITransportCompanyModel} from "../../domain/models/transportCompanyModels/transport-company.model";

@Injectable()
export class UserService {
  private baseURL = `${apiAddress}/api/user`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IUserModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IUserModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<IUserModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(userObject: IUserModel): Observable<HttpResponse<IUserModel>> {
    return this.http.post(`${this.baseURL}/CreateUser`, userObject, {observe: "response", responseType: "json"})
  }

  update(userObject: IUserModel): Observable<HttpResponse<IUserModel>> {
    return this.http.put(`${this.baseURL}/UpdateUser`, userObject, {observe: "response", responseType: "json"})
  }

  delete(userId: string): Observable<HttpResponse<ITransportCompanyModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
  }
}

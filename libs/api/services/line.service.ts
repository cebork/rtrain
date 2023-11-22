import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel} from "../../domain/models/generic-GetAll-Model.model";
import {ILocalizationModel, ITransportCompanyModel, IUserModel} from "../../domain/models";
import {ILineModel} from "../../domain/models/lineModels/line.model";

@Injectable()
export class LineService {
  private baseURL = `${apiAddress}/api/line`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ILineModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ILineModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<ILineModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(userObject: ILineModel): Observable<HttpResponse<ILineModel>> {
    return this.http.post(`${this.baseURL}/Create`, userObject, {observe: "response", responseType: "json"})
  }

  update(userObject: ILineModel): Observable<HttpResponse<ILineModel>> {
    return this.http.put(`${this.baseURL}/Update`, userObject, {observe: "response", responseType: "json"})
  }

  delete(userId: string): Observable<HttpResponse<ILineModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
  }
}

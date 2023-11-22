import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel, ITrainTypeModel} from "../../domain/models";

@Injectable()
export class TrainTypeService {
  private baseURL = `${apiAddress}/api/trainType`;

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ITrainTypeModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ITrainTypeModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<ITrainTypeModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(userObject: ITrainTypeModel): Observable<HttpResponse<ITrainTypeModel>> {
    return this.http.post(`${this.baseURL}/Create`, userObject, {observe: "response", responseType: "json"})
  }

  update(userObject: ITrainTypeModel): Observable<HttpResponse<ITrainTypeModel>> {
    return this.http.put(`${this.baseURL}/Update`, userObject, {observe: "response", responseType: "json"})
  }

  delete(userId: string): Observable<HttpResponse<ITrainTypeModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
  }
}

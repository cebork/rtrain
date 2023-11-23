import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel, ITrainModel} from "../../domain/models";

@Injectable()
export class TrainService {
  private baseURL = `${apiAddress}/api/trains`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ITrainModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ITrainModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<ITrainModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(trainModel: ITrainModel): Observable<HttpResponse<ITrainModel>> {
    return this.http.post(`${this.baseURL}/Create`, trainModel, {observe: "response", responseType: "json"})
  }

  update(trainModel: ITrainModel): Observable<HttpResponse<ITrainModel>> {
    return this.http.put(`${this.baseURL}/Update`, trainModel, {observe: "response", responseType: "json"})
  }

  delete(trainId: string): Observable<HttpResponse<ITrainModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${trainId}`, {observe: 'response', responseType: "json"})
  }
}

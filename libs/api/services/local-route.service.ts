import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel} from "../../domain/models";
import {ILocalRouteModel} from "../../domain/models";

@Injectable()
export class LocalRouteService {
  private baseURL = `${apiAddress}/api/localRoute`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ILocalRouteModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ILocalRouteModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<ILocalRouteModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(localRouteModel: ILocalRouteModel): Observable<HttpResponse<ILocalRouteModel>> {
    return this.http.post(`${this.baseURL}/Create`, localRouteModel, {observe: "response", responseType: "json"})
  }

  update(localRouteModel: ILocalRouteModel): Observable<HttpResponse<ILocalRouteModel>> {
    return this.http.put(`${this.baseURL}/Update`, localRouteModel, {observe: "response", responseType: "json"})
  }

  delete(localRouteId: string): Observable<HttpResponse<ILocalRouteModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${localRouteId}`, {observe: 'response', responseType: "json"})
  }

  saveFromList(localRouteModels: ILocalRouteModel[], lineId: string): Observable<HttpResponse<ILocalRouteModel[]>> {
    return this.http.post<ILocalRouteModel[]>(`${this.baseURL}/SaveFromList/${lineId}`, localRouteModels, {observe: "response", responseType: "json"})
  }

  getAllForLine(lineId: string): Observable<HttpResponse<ILocalRouteModel[]>> {
    return this.http.get<ILocalRouteModel[]>(`${this.baseURL}/GetAllForLine/${lineId}`, {observe: "response", responseType: "json"})
  }

  getAllForLineTrainSchedule(lineId:string, page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ILocalRouteModel>>> {
    const params = new HttpParams()
      .set('lineId', lineId)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ILocalRouteModel>>(this.baseURL + '/GetAllForLineTrainSchedule', { params, observe: "response", responseType: "json" });
  }

  getAllForLineStationLevel(lineId: string, stationId: string): Observable<HttpResponse<ILocalRouteModel[]>> {
    return this.http.get<ILocalRouteModel[]>(`${this.baseURL}/GetAllForLineStationLevel/${lineId}/${stationId}`, {observe: "response", responseType: "json"})
  }
}

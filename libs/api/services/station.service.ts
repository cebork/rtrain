import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel} from "../../domain/models/generic-GetAll-Model.model";
import {ILocalizationModel, IStationModel} from "../../domain/models";

@Injectable()
export class StationService {
  private baseURL = `${apiAddress}/api/station`

  constructor(private http: HttpClient) {
  }

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IStationModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IStationModel>>(this.baseURL + '/GetAll', {
      params,
      observe: "response",
      responseType: "json"
    });
  }

  getById(id: string): Observable<HttpResponse<IStationModel>> {
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(userObject: IStationModel): Observable<HttpResponse<IStationModel>> {
    return this.http.post(`${this.baseURL}/Create`, userObject, {observe: "response", responseType: "json"})
  }

  update(userObject: IStationModel): Observable<HttpResponse<IStationModel>> {
    return this.http.put(`${this.baseURL}/Update`, userObject, {observe: "response", responseType: "json"})
  }

  delete(userId: string): Observable<HttpResponse<IStationModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
  }

  getAllForLines(): Observable<HttpResponse<IStationModel[]>> {
    return this.http.get<IStationModel[]>(`${this.baseURL}/getAllForLines`, {
      observe: "response",
      responseType: "json"
    });
  }

  getAllForConnections(): Observable<HttpResponse<IStationModel[]>> {
    return this.http.get<IStationModel[]>(`${this.baseURL}/getAllForConnections`, {
      observe: "response",
      responseType: "json"
    });
  }

  getAllStationsForGivenLine(lineId: string): Observable<HttpResponse<IStationModel[]>> {
    return this.http.get<IStationModel[]>(`${this.baseURL}/getAllStationsForGivenLine/${lineId}`, {
      observe: "response",
      responseType: "json"
    });
  }
}

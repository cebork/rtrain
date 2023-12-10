import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel, IIncidentCodeModel} from "../../domain/models";


@Injectable()
export class IncidentCodeService {
  private baseURL = `${apiAddress}/api/incidentCodes`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IIncidentCodeModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IIncidentCodeModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<IIncidentCodeModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(incidentCodeModel: IIncidentCodeModel): Observable<HttpResponse<IIncidentCodeModel>> {
    return this.http.post(`${this.baseURL}/Create`, incidentCodeModel, {observe: "response", responseType: "json"})
  }

  update(incidentCodeModel: IIncidentCodeModel): Observable<HttpResponse<IIncidentCodeModel>> {
    return this.http.put(`${this.baseURL}/Update`, incidentCodeModel, {observe: "response", responseType: "json"})
  }

  delete(incidentCodeId: string): Observable<HttpResponse<IIncidentCodeModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${incidentCodeId}`, {observe: 'response', responseType: "json"})
  }

  getRawIncidentCodes(): Observable<HttpResponse<IIncidentCodeModel[]>> {
      return this.http.get<IIncidentCodeModel[]>(`${this.baseURL}/getRawIncidentCodes`, {observe: "response", responseType: "json"})
  }
}

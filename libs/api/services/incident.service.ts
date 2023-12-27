import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel, IIncidentModel, ILocalRouteModel} from "../../domain/models";
import {IIncidentForTrafficGraphModel} from "../../domain/models/incidentModels/incident-for-traffic-graph.model";

@Injectable()
export class IncidentService {
    private baseURL = `${apiAddress}/api/incidents`

    constructor(private http: HttpClient) {}

    getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IIncidentModel>>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', sortField + ',' + sortOrder)
            .set('globalFilter', globalFilter);
        return this.http.get<IGenericGetAllModelModel<IIncidentModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
    }

    getById(id: string): Observable<HttpResponse<IIncidentModel>>{
        return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
    }

    create(incidentObject: IIncidentModel): Observable<HttpResponse<IIncidentModel>> {
        return this.http.post(`${this.baseURL}/Create`, incidentObject, {observe: "response", responseType: "json"})
    }

    update(userObject: IIncidentModel): Observable<HttpResponse<IIncidentModel>> {
        return this.http.put(`${this.baseURL}/Update`, userObject, {observe: "response", responseType: "json"})
    }

    // delete(userId: string): Observable<HttpResponse<ITransportCompanyModel>> {
    //     return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
    // }
    getAllForLocalRoute(localrouteId: string, page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IIncidentModel>>>  {
        const params = new HttpParams()
            .set('localRouteId', localrouteId)
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', sortField + ',' + sortOrder)
            .set('globalFilter', globalFilter);
        return this.http.get<IGenericGetAllModelModel<IIncidentModel>>(this.baseURL + '/GetAllForLocalRoute', { params, observe: "response", responseType: "json" });
    }

  getAllForFirm(firmId: string, page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IIncidentModel>>> {
    const params = new HttpParams()
      .set('firmId', firmId)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IIncidentModel>>(this.baseURL + '/getAllIncidentsForFirm', { params, observe: "response", responseType: "json" });
  }

  getAllForLine(lineId: string, page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IIncidentModel>>> {
    const params = new HttpParams()
      .set('lineId', lineId)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IIncidentModel>>(this.baseURL + '/getAllIncidentsForLine', { params, observe: "response", responseType: "json" });
  }

  getAllIncidentsForTrafficGraph(lineId: string): Observable<HttpResponse<IIncidentForTrafficGraphModel[]>> {
    return this.http.get<IIncidentForTrafficGraphModel[]>(`${this.baseURL}/getAllIncidentsForTrafficGraph/${lineId}`, {observe: "response", responseType: "json"})
  }
}

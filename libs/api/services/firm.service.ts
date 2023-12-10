import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel} from "../../domain/models";
import {IFirmModel} from "../../domain/models";

@Injectable()
export class FirmService {
  private baseURL = `${apiAddress}/api/firms`

  constructor(private http: HttpClient) {
  }

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<IFirmModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<IFirmModel>>(this.baseURL + '/GetAll', {
      params,
      observe: "response",
      responseType: "json"
    });
  }

  getById(id: string): Observable<HttpResponse<IFirmModel>> {
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(firmModel: IFirmModel): Observable<HttpResponse<IFirmModel>> {
    return this.http.post(`${this.baseURL}/Create`, firmModel, {observe: "response", responseType: "json"})
  }

  update(firmModel: IFirmModel): Observable<HttpResponse<IFirmModel>> {
    return this.http.put(`${this.baseURL}/Update`, firmModel, {observe: "response", responseType: "json"})
  }

  delete(firmModelId: string): Observable<HttpResponse<IFirmModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${firmModelId}`, {observe: 'response', responseType: "json"})
  }

  getRawForDropdown(): Observable<HttpResponse<IFirmModel[]>> {
    return this.http.get<IFirmModel[]>(`${this.baseURL}/getRawForDropdown`, {observe: "response", responseType: "json"})
  }
}

import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel} from "../../domain/models";
import {ILocalizationModel, ITransportCompanyModel, IUserModel} from "../../domain/models";

@Injectable()
export class LocalizationService {
  private baseURL = `${apiAddress}/api/localization`

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ILocalizationModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ILocalizationModel>>(this.baseURL + '/GetAll', { params, observe: "response", responseType: "json" });
  }

  getById(id: string): Observable<HttpResponse<ILocalizationModel>>{
    return this.http.get(`${this.baseURL}/${id}`, {observe: "response", responseType: "json"})
  }

  create(userObject: ILocalizationModel): Observable<HttpResponse<ILocalizationModel>> {
    return this.http.post(`${this.baseURL}/Create`, userObject, {observe: "response", responseType: "json"})
  }

  update(userObject: ILocalizationModel): Observable<HttpResponse<ILocalizationModel>> {
    return this.http.put(`${this.baseURL}/Update`, userObject, {observe: "response", responseType: "json"})
  }

  delete(userId: string): Observable<HttpResponse<ILocalizationModel>> {
    return this.http.delete(`${this.baseURL}/Delete/${userId}`, {observe: 'response', responseType: "json"})
  }
}

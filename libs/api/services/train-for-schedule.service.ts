import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenericGetAllModelModel, IStationModel} from "../../domain/models";
import {ITrainForScheduleModel} from "../../domain/models/train-schedule/train-for-schedule.model";
import {line} from "d3";

@Injectable()
export class TrainForScheduleService {
  private baseURL = `${apiAddress}/api/trainForSchedule`

  constructor(private http: HttpClient) {
  }

  getAll(page: number, size: number, sortField: string, sortOrder: string, globalFilter: string): Observable<HttpResponse<IGenericGetAllModelModel<ITrainForScheduleModel>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sortField + ',' + sortOrder)
      .set('globalFilter', globalFilter);
    return this.http.get<IGenericGetAllModelModel<ITrainForScheduleModel>>(this.baseURL + '/GetAll', {
      params,
      observe: "response",
      responseType: "json"
    });
  }
  updateList(trainsForScheduleModel: ITrainForScheduleModel[]): Observable<HttpResponse<ITrainForScheduleModel[]>> {
    return this.http.post<ITrainForScheduleModel[]>(`${this.baseURL}/UpdateList`, trainsForScheduleModel, {observe: "response", responseType: "json"})
  }

  getAllByLine(lineId: string): Observable<HttpResponse<ITrainForScheduleModel[]>>{
    return this.http.get<ITrainForScheduleModel[]>(`${this.baseURL}/GetAll/${lineId}`, {observe: "response", responseType: "json"})
  }
}

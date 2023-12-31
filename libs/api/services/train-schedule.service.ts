import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITrainScheduleModel} from "../../domain/models";
import {ITrainScheduleForTrafficGraph} from "../../domain/models/train-schedule/train-schedule-for-traffic-graph";

@Injectable()
export class TrainScheduleService {
  private baseURL = `${apiAddress}/api/trainSchedule`

  constructor(private http: HttpClient) {
  }

  getTrainScheduleForLine(lineId: string, trainId: string, trainForScheduleId: string): Observable<HttpResponse<ITrainScheduleModel[]>> {
    return this.http.get<ITrainScheduleModel[]>(`${this.baseURL}/GetTrainScheduleForLine/${trainId}/${lineId}/${trainForScheduleId}`, {responseType: 'json', observe: 'response'})
  }

  saveAll(trainScheduleCopy: any): Observable<HttpResponse<ITrainScheduleModel[]>> {
    return this.http.post<ITrainScheduleModel[]>(`${this.baseURL}/saveAll`, trainScheduleCopy, {observe: "response", responseType: "json"})
  }

  getTrainScheduleForTrafficGraph(lineId: string): Observable<HttpResponse<ITrainScheduleForTrafficGraph[][]>> {
    return this.http.get<ITrainScheduleForTrafficGraph[][]>(`${this.baseURL}/getTrainScheduleForTrafficGraph/${lineId}`, {observe: 'response', responseType: "json"});
  }
}

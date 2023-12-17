import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRealtimeTrainScheduleModel} from "../../domain/models";
import {ITrainScheduleForTrafficGraph} from "../../domain/models/train-schedule/train-schedule-for-traffic-graph";

@Injectable()
export class RealtimeTrainScheduleService {
  private baseURL = `${apiAddress}/api/realtimeSchedule`

  constructor(private http: HttpClient) {
  }

  getTodaySchedule(stationId: string): Observable<HttpResponse<IRealtimeTrainScheduleModel[]>>{
    return this.http.get<IRealtimeTrainScheduleModel[]>(`${this.baseURL}/getTodaySchedule/${stationId}`, {responseType: "json", observe: "response"})
  }

  saveRealTime(realTimeTrainSchedule: IRealtimeTrainScheduleModel, stationId: string): Observable<HttpResponse<IRealtimeTrainScheduleModel[]>> {
    return this.http.post<IRealtimeTrainScheduleModel[]>(`${this.baseURL}/saveRealtime/${stationId}`, realTimeTrainSchedule, {observe: 'response', responseType: 'json'});
  }

  getRealtimeTrainScheduleForTrafficGraph(lineId: string): Observable<HttpResponse<ITrainScheduleForTrafficGraph[][]>> {
    return this.http.get<ITrainScheduleForTrafficGraph[][]>(`${this.baseURL}/getRealtimeTrainScheduleForTrafficGraph/${lineId}`, {observe: "response", responseType: "json"})
  }
}

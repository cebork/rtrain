import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRealtimeTrainScheduleModel} from "../../domain/models";

@Injectable()
export class RealtimeTrainScheduleService {
  private baseURL = `${apiAddress}/api/realtimeSchedule`

  constructor(private http: HttpClient) {
  }

  getTodaySchedule(stationId: string): Observable<HttpResponse<IRealtimeTrainScheduleModel[]>>{
    return this.http.get<IRealtimeTrainScheduleModel[]>(`${this.baseURL}/getTodaySchedule/${stationId}`, {responseType: "json", observe: "response"})
  }

}

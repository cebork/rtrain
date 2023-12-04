import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITrainScheduleModel} from "../../domain/models";

@Injectable()
export class TrainScheduleService {
  private baseURL = `${apiAddress}/api/trainSchedule`

  constructor(private http: HttpClient) {
  }

  getTrainScheduleForLine(lineId: string, trainId: string): Observable<HttpResponse<ITrainScheduleModel[]>> {
    return this.http.get<ITrainScheduleModel[]>(`${this.baseURL}/GetTrainScheduleForLine/${trainId}/${lineId}`, {responseType: 'json', observe: 'response'})
  }

  saveAll(trainScheduleCopy: any): Observable<HttpResponse<ITrainScheduleModel[]>> {
    return this.http.post<ITrainScheduleModel[]>(`${this.baseURL}/saveAll`, trainScheduleCopy, {observe: "response", responseType: "json"})
  }
}

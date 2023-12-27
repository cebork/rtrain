import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDelayDescriptionModel} from "../../domain/models/delayDescriptionModels/delay-description.model";

@Injectable()
export class DelayDescriptionService {
  private baseURL = `${apiAddress}/api/delayDescription`

  constructor(private http: HttpClient) {
  }

  create(delayDescriptionModel: IDelayDescriptionModel): Observable<HttpResponse<IDelayDescriptionModel>> {
    return this.http.post(`${this.baseURL}/Create`, delayDescriptionModel, {observe: "response", responseType: "json"})
  }

  getAllByIncidentIdAndtrainForScheduleId(incidentId: string, trainForScheduleId: string): Observable<HttpResponse<IDelayDescriptionModel[]>> {
    return this.http.get<IDelayDescriptionModel[]>(`${this.baseURL}/getAllByIncidentAndTrainForSchedule/${incidentId}/${trainForScheduleId}`, { observe: "response", responseType: "json" });
  }
}

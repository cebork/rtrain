import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import * as signalR from '@microsoft/signalr';
import {IIncidentForTrafficGraphModel} from "../../domain/models/incidentModels/incident-for-traffic-graph.model";
import {ITrainScheduleForTrafficGraph} from "../../domain/models/train-schedule/train-schedule-for-traffic-graph";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private baseURL = `${apiAddress}/api/hub`
  private hubConnection: signalR.HubConnection | undefined;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch(err => console.error('Error while starting connection: ' + err))
  }

  public addIncidentsListener = (): Observable<IIncidentForTrafficGraphModel[]> => {
    return new Observable(observe => {
      if (this.hubConnection){
        this.hubConnection.on("SendIncidentsToTrafficGraph", ( data: IIncidentForTrafficGraphModel[]) => {
          observe.next(data)
        })
      } else {
        observe.error(new Error("hubConnection is not established"));
      }
    })
  }

  public addRealTimeTrainScheduleListener = (): Observable<ITrainScheduleForTrafficGraph[][]> => {
    return new Observable(observe => {
      if (this.hubConnection){
        this.hubConnection.on("SendRealTimesToTrafficGraph", ( data) => {
          observe.next(data)
        })
      } else {
        observe.error(new Error("hubConnection is not established"));
      }
    })
  }


  public disconnect = () => {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log("Connection stopped"))
        .catch(err => console.error('Error while stopping connection: ' + err));
    }
  }

}

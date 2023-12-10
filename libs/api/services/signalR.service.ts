import {Injectable} from "@angular/core";
import {apiAddress} from "../env-variable";
import * as signalR from '@microsoft/signalr';
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

  public addTrafficGraphListener = () => {
    if (this.hubConnection)
    this.hubConnection.on("toTrafficGraphMessage", ( data) => {
      console.log(data)
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

import {IIncidentModel} from "./incident.model";

export interface IIncidentForTrafficGraphModel {
  incident: IIncidentModel,
  incidentStart: string,
  incidentEnd: string,
  fromStationName: string,
  toStationName: string
}

export class IncidentForTrafficGraphModel implements IIncidentForTrafficGraphModel {
  fromStationName: string;
  incident: IIncidentModel;
  incidentEnd: string;
  incidentStart: string;
  toStationName: string;


  constructor(fromStationName: string, incident: IIncidentModel, incidentEnd: string, incidentStart: string, toStationName: string) {
    this.fromStationName = fromStationName;
    this.incident = incident;
    this.incidentEnd = incidentEnd;
    this.incidentStart = incidentStart;
    this.toStationName = toStationName;
  }
}

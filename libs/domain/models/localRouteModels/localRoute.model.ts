import {IStationModel, StationModel} from "../stationModels/station.model";

export interface ILocalRouteModel {
  id?: string;
  lineId?: string;
  fromStationId?: string;
  fromStation?: IStationModel;
  toStationId?: string;
  toStation?: IStationModel;
  routeProblem?: boolean;
  distance?: number;
  oneWay?: boolean;
  order?: number;
}

export class LocalRouteModel implements ILocalRouteModel{
  distance?: number;
  fromStation?: IStationModel;
  fromStationId?: string;
  id?: string;
  lineId?: string;
  oneWay?: boolean;
  order?: number;
  routeProblem?: boolean;
  toStation?: IStationModel;
  toStationId?: string;


  constructor(distance?: number, fromStation?: IStationModel, fromStationId?: string, id?: string, lineId?: string,
              oneWay?: boolean, order?: number, routeProblem?: boolean, toStation?: IStationModel, toStationId?: string) {
    this.distance = distance;
    this.fromStation = fromStation ? fromStation : new StationModel();
    this.fromStationId = fromStationId;
    this.id = id;
    this.lineId = lineId;
    this.oneWay = oneWay;
    this.order = order;
    this.routeProblem = routeProblem;
    this.toStation = toStation ? toStation : new StationModel();
    this.toStationId = toStationId;
  }
}

import {active, symbol} from "d3";
import {IStationModel, StationModel} from "../stationModels/station.model";

export interface ILineModel {
  id?: string;
  active?: boolean;
  name?: string;
  symbol?: string;
  leftEdgeStationId?: string;
  leftEdgeStation?: IStationModel;
  rightEdgeStationId?: string;
  rightEdgeStation?: IStationModel;
  distance?: number;
}

export class LineModel implements ILineModel {
  active?: boolean;
  id?: string;
  name?: string;
  symbol?: string;
  leftEdgeStationId?: string;
  leftEdgeStation?: IStationModel;
  rightEdgeStationId?: string;
  rightEdgeStation?: IStationModel;
  distance?: number;

  constructor(active?: boolean, id?: string, leftEdgeStation?: IStationModel, name?: string,
              rightEdgeStation?: IStationModel, symbol?: string, leftEdgeStationId?: string, rightEdgeStationId?: string,
              distance?: number) {
    this.active = active;
    this.id = id;
    this.leftEdgeStation = leftEdgeStation ? leftEdgeStation : undefined;
    this.name = name;
    this.rightEdgeStation = rightEdgeStation ? rightEdgeStation : undefined;
    this.symbol = symbol;
    this.leftEdgeStationId = leftEdgeStationId;
    this.rightEdgeStationId = rightEdgeStationId;
    this.distance = distance;
  }
}

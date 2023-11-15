import {active, symbol} from "d3";

export interface ILineModel {
  id?: string;
  active?: boolean;
  name?: string;
  symbol?: string;
  leftEdgeStationId?: string;
  rightEdgeStationId?: string;
}

export class LineModel implements ILineModel {
  active?: boolean;
  id?: string;
  leftEdgeStationId?: string;
  name?: string;
  rightEdgeStationId?: string;
  symbol?: string;


  constructor(active?: boolean, id?: string, leftEdgeStationId?: string, name?: string, rightEdgeStationId?: string, symbol?: string) {
    this.active = active;
    this.id = id;
    this.leftEdgeStationId = leftEdgeStationId;
    this.name = name;
    this.rightEdgeStationId = rightEdgeStationId;
    this.symbol = symbol;
  }
}

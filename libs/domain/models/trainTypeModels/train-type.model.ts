import {symbol} from "d3";

export interface ITrainTypeModel {
  id?: string;
  active?: boolean;
  name?: string;
  symbol?: string;
}

export class TrainTypeModel implements ITrainTypeModel{
  id?: string;
  active?: boolean;
  name?: string;
  symbol?: string;

  constructor(id?:string, active?: boolean, name?: string, symbol?: string) {
    this.id = id;
    this.active = active;
    this.name = name;
    this.symbol = symbol;
  }
}

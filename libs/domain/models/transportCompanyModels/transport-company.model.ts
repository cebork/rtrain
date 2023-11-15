import {symbol} from "d3";

export interface ITransportCompanyModel {
  id?: string
  name?: string,
  symbol?: string,
  active?: boolean
}

export class TransportCompanyModel implements ITransportCompanyModel{
  id?: string;
  name?: string;
  symbol?: string;
  active?: boolean;


  constructor(id?: string, name?: string, symbol?: string, active?: boolean) {
    this.id = id;
    this.name = name;
    this.symbol = symbol;
    this.active = active;
  }
}

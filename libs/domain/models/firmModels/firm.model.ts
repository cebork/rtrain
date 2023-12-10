export interface IFirmModel {
  id?: string;
  active?: boolean;
  name?: string;
  symbol?: string
}

export class FirmModel implements IFirmModel{
  active?: boolean;
  id?: string;
  name?: string;
  symbol?: string;


  constructor(active?: boolean, id?: string, name?: string, symbol?: string) {
    this.active = active;
    this.id = id;
    this.name = name;
    this.symbol = symbol;
  }
}

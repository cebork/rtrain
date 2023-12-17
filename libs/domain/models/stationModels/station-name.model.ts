export interface IStationNameModel {
  name?: string;
}

export class StationNameModel implements IStationNameModel{
  name?: string;


  constructor(name?: string) {
    this.name = name;
  }
}

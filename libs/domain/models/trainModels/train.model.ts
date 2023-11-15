import {scheduled} from "rxjs";

export interface ITrainModel {
  id: string
  code: string
  name: string
  wagonNumber: number
  transportCompany: string
  scheduled: boolean
  removed: boolean
}

export class TrainModel implements ITrainModel{
  id: string;
  code: string;
  name: string;
  removed: boolean;
  scheduled: boolean;
  transportCompany: string;
  wagonNumber: number;

  constructor(id: string, code: string, name: string, removed: boolean, scheduled: boolean, transportCompany: string, wagonNumber: number) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.removed = removed;
    this.scheduled = scheduled;
    this.transportCompany = transportCompany;
    this.wagonNumber = wagonNumber;
  }
}

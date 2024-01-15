import {ITrainModel} from "../trainModels/train.model";

export interface ITrainScheduleForTrafficGraph {
  departureTime: string;
  arrivalTime: string;
  station: string
  train: ITrainModel;
  isOnce: boolean;
}

export class TTrainScheduleForTrafficGraph implements ITrainScheduleForTrafficGraph {
  arrivalTime: string;
  departureTime: string;
  station: string
  train: ITrainModel;
  isOnce: boolean;


  constructor(arrivalTime: string, departureTime: string, station: string, train: ITrainModel, isOnce: boolean) {
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.station = station;
    this.train = train;
    this.isOnce = isOnce;
  }
}

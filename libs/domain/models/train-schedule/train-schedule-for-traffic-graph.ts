import {ITrainModel} from "../trainModels/train.model";

export interface ITrainScheduleForTrafficGraph {
  departureTime: string;
  arrivalTime: string;
  station: string
  train: ITrainModel;
}

export class TTrainScheduleForTrafficGraph implements ITrainScheduleForTrafficGraph {
  arrivalTime: string;
  departureTime: string;
  station: string
  train: ITrainModel;


  constructor(arrivalTime: string, departureTime: string, station: string, train: ITrainModel) {
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.station = station;
    this.train = train;
  }
}

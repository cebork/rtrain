import {IStationModel} from "../stationModels/station.model";
import {ITrainModel} from "../trainModels/train.model";
import {ILineModel} from "../lineModels/line.model";

export interface ITrainScheduleModel {
  id?: string;
  active?: boolean;
  arrivalTime?: Date | undefined;
  departureTime?: Date | undefined;
  order?: number;
  stationId?: string;
  station?: IStationModel;
  trainId?: string;
  train?: ITrainModel;
  lineId?: string;
  line?: ILineModel;
}

export class TrainScheduleModel implements ITrainScheduleModel{
  id?: string;
  active?: boolean;
  arrivalTime?: Date | undefined;
  departureTime?: Date | undefined;
  order?: number;
  stationId?: string;
  station?: IStationModel;
  trainId?: string;
  train?: ITrainModel;
  lineId?: string;
  line?: ILineModel;

  constructor(active?: boolean, arrivalTime?: Date, departureTime?: Date,
              id?: string, order?: number, train?: ITrainModel, trainId?: string, lineId?: string, line?: ILineModel) {
    this.active = active;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.id = id;
    this.order = order;
    this.train = train;
    this.trainId = trainId;
    this.lineId = lineId;
    this.line = line;
  }
}

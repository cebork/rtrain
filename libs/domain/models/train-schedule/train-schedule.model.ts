import {IStationModel} from "../stationModels/station.model";
import {ITrainModel} from "../trainModels/train.model";
import {ILineModel} from "../lineModels/line.model";
import {ITrainForScheduleModel} from "./train-for-schedule.model";

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
  trainForScheduleId?: string;
  trainForSchedule?: ITrainForScheduleModel;
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
  trainForScheduleId?: string;
  trainForSchedule?: ITrainForScheduleModel;

  constructor(active?: boolean, arrivalTime?: Date, departureTime?: Date,
              id?: string, order?: number, train?: ITrainModel, trainId?: string, lineId?: string, line?: ILineModel,
              trainForScheduleId?: string, trainForSchedule?: ITrainForScheduleModel) {
    this.active = active;
    this.arrivalTime = arrivalTime;
    this.departureTime = departureTime;
    this.id = id;
    this.order = order;
    this.train = train;
    this.trainId = trainId;
    this.lineId = lineId;
    this.line = line;
    this.trainForScheduleId = trainForScheduleId;
    this.trainForSchedule = trainForSchedule;
  }
}

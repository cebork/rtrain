import {ITrainModel} from "../trainModels/train.model";
import {ILineModel} from "../lineModels/line.model";
import {IStationModel} from "../stationModels/station.model";
import {active, line} from "d3";
import {scheduled} from "rxjs";

export interface ITrainForScheduleModel {
  id?: string;
  active?: boolean;
  trainId?: string;
  train?: ITrainModel;
  lineId?: string;
  line?: ILineModel;
  fromStationId?: string
  fromStation?: IStationModel
  toStationId?: string
  toStation?: IStationModel
  isOnce?: boolean
  scheduled?: boolean
}

export class TrainForScheduleModel implements ITrainForScheduleModel {
  active?: boolean;
  fromStation?: IStationModel;
  fromStationId?: string;
  id?: string;
  line?: ILineModel;
  lineId?: string;
  toStation?: IStationModel;
  toStationId?: string;
  train?: ITrainModel;
  trainId?: string;
  isOnce?: boolean
  scheduled?: boolean

  constructor(active?: boolean, fromStation?: IStationModel, fromStationId?: string, id?: string, line?: ILineModel,
              lineId?: string, toStation?: IStationModel, toStationId?: string, train?: ITrainModel, trainId?: string,
              isOnce?: boolean, scheduled?: boolean) {
    this.active = active;
    this.fromStation = fromStation;
    this.fromStationId = fromStationId;
    this.id = id;
    this.line = line;
    this.lineId = lineId;
    this.toStation = toStation;
    this.toStationId = toStationId;
    this.train = train;
    this.trainId = trainId;
    this.isOnce = isOnce;
    this.scheduled = scheduled;
  }
}

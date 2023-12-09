import {ITrainScheduleModel} from "../train-schedule/train-schedule.model";
import {ITrainModel} from "../trainModels/train.model";

export interface IRealtimeTrainScheduleModel {
  realTimeArrivalTime?: Date;
  realTimeDepartureTime?: Date;
  scheduleForDay?: Date;
  trainScheduleId?: string;
  trainSchedule?: ITrainScheduleModel;
  trainId?: string;
  train?: ITrainModel;
}

export class RealtimeTrainScheduleModel implements IRealtimeTrainScheduleModel {
  realTimeArrivalTime?: Date;
  realTimeDepartureTime?: Date;
  scheduleForDay?: Date;
  train?: ITrainModel;
  trainId?: string;
  trainSchedule?: ITrainScheduleModel;
  trainScheduleId?: string;


  constructor(realTimeArrivalTime?: Date, realTimeDepartureTime?: Date, scheduleForDay?: Date, train?: ITrainModel,
              trainId?: string, trainSchedule?: ITrainScheduleModel, trainScheduleId?: string) {
    this.realTimeArrivalTime = realTimeArrivalTime;
    this.realTimeDepartureTime = realTimeDepartureTime;
    this.scheduleForDay = scheduleForDay;
    this.train = train;
    this.trainId = trainId;
    this.trainSchedule = trainSchedule;
    this.trainScheduleId = trainScheduleId;
  }
}

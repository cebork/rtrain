import {IIncidentModel} from "../incidentModels/incident.model";
import {ITrainForScheduleModel} from "../train-schedule/train-for-schedule.model";

export interface IDelayDescriptionModel {
  id?: string;
  description?: string;
  incidentId?: string;
  incident?: IIncidentModel;
  trainForScheduleId?: string;
  trainForSchedule?: ITrainForScheduleModel;
}

export class DelayDescriptionModel implements IDelayDescriptionModel {
  description?: string;
  id?: string;
  incident?: IIncidentModel;
  incidentId?: string;
  trainForScheduleId?: string;
  trainForSchedule?: ITrainForScheduleModel;


  constructor(description?: string, id?: string, incident?: IIncidentModel, incidentId?: string, trainForSchedule?: ITrainForScheduleModel, trainForScheduleId?: string) {
    this.description = description;
    this.id = id;
    this.incident = incident;
    this.incidentId = incidentId;
    this.trainForSchedule = trainForSchedule;
    this.trainForScheduleId = trainForScheduleId;
  }
}

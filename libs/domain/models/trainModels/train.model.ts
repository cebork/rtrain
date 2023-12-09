import {scheduled} from "rxjs";
import {ITransportCompanyModel} from "../transportCompanyModels/transport-company.model";
import {ITrainTypeModel} from "../trainTypeModels/train-type.model";
import {active} from "d3";

export interface ITrainModel {
  id?: string
  active?: boolean
  code?: string
  name?: string
  wagonNumber?: number
  transportCompanyId?: string
  transportCompany?: ITransportCompanyModel;
  trainTypeId?: string;
  trainType?: ITrainTypeModel;

}

export class TrainModel implements ITrainModel{
  id?: string
  active?: boolean
  code?: string
  name?: string
  wagonNumber?: number
  transportCompanyId?: string
  transportCompany?: ITransportCompanyModel;
  trainType?: ITrainTypeModel;



  constructor(id?: string, active?: boolean, code?: string, name?: string, wagonNumber?: number, transportCompanyId?: string,
              transportCompany?: ITransportCompanyModel, trainType?: ITrainTypeModel) {
    this.id = id;
    this.active = active;
    this.code = code;
    this.name = name;
    this.wagonNumber = wagonNumber;
    this.transportCompanyId = transportCompanyId;
    this.transportCompany = transportCompany;
    this.trainType = trainType;

  }
}

import {ILocalizationModel, LocalizationModel} from "../localizationModels/localization.model";
import {active} from "d3";
import {IFirmModel} from "../firmModels/firm.model";

export interface IStationModel {
  id?: string;
  active?: boolean;
  name?: string;
  weight?: number;
  platformAmount?: number;
  trackAmount?: number;
  localization?: ILocalizationModel
  firmId?: string;
  firm?: IFirmModel;
}

export class StationModel implements IStationModel{
  active?: boolean;
  id?: string;
  localization?: ILocalizationModel;
  name?: string;
  platformAmount?: number;
  trackAmount?: number;
  weight?: number;
  firmId?: string;
  firm?: IFirmModel;

  constructor(active?: boolean, id?: string, localization?: ILocalizationModel, name?: string, platformAmount?: number,
              trackAmount?: number, weight?: number, firmId?: string, firm?: IFirmModel) {
    this.active = active;
    this.id = id;
    this.localization = localization ? localization : new LocalizationModel();
    this.name = name;
    this.platformAmount = platformAmount;
    this.trackAmount = trackAmount;
    this.weight = weight;
    this.firmId = firmId ? firmId : undefined;
    this.firm = firm;
  }
}

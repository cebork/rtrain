import {ILocalizationModel, LocalizationModel} from "../localizationModels/localization.model";
import {active} from "d3";

export interface IStationModel {
  id?: string;
  active?: boolean;
  name?: string;
  weight?: number;
  platformAmount?: number;
  trackAmount?: number;
  localization?: ILocalizationModel
}

export class StationModel implements IStationModel{
  active?: boolean;
  id?: string;
  localization?: ILocalizationModel;
  name?: string;
  platformAmount?: number;
  trackAmount?: number;
  weight?: number;


  constructor(active?: boolean, id?: string, localization?: ILocalizationModel, name?: string, platformAmount?: number, trackAmount?: number, weight?: number) {
    this.active = active;
    this.id = id;
    this.localization = localization ? localization : new LocalizationModel();
    this.name = name;
    this.platformAmount = platformAmount;
    this.trackAmount = trackAmount;
    this.weight = weight;
  }
}

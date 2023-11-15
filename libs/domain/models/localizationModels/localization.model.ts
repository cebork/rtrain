import {active} from "d3";

export interface ILocalizationModel {
  id?: string;
  voivodeship?: string
  county?: string
  commune?: string
  city?: string
  active?: boolean;
}

export class LocalizationModel implements ILocalizationModel{
  active?: boolean;
  city?: string;
  commune?: string;
  county?: string;
  id?: string;
  voivodeship?: string;


  constructor(active?: boolean, city?: string, commune?: string, county?: string, id?: string, voivodeship?: string) {
    this.active = active;
    this.city = city;
    this.commune = commune;
    this.county = county;
    this.id = id;
    this.voivodeship = voivodeship;
  }
}

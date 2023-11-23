import {active} from "d3";

export interface IIncidentCodeModel {
  id?: string;
  active?: boolean;
  name?: string;
  description?: string;
}

export class IncidentCodeModel implements IIncidentCodeModel {
  active?: boolean;
  description?: string;
  id?: string;
  name?: string;


  constructor(active?: boolean, description?: string, id?: string, name?: string) {
    this.active = active;
    this.description = description;
    this.id = id;
    this.name = name;
  }
}

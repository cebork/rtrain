import {IIncidentCodeModel} from "../incidentCodeModels/incident-code.model";
import {ILocalRouteModel} from "../localRouteModels/localRoute.model";

export interface IIncidentModel {
    id?: string;
    name?: string;
    description?: string;
    incidentCodeId?: string;
    incidentCode?: IIncidentCodeModel;
    localRouteId?: string;
    localRoute?: ILocalRouteModel;
    closingStart?: Date;
    closingEnd?: Date;
}

export class IncidentModel implements IIncidentModel {
    description?: string;
    id?: string;
    incidentCode?: IIncidentCodeModel;
    incidentCodeId?: string;
    localRoute?: ILocalRouteModel;
    localRouteId?: string;
    name?: string;
    closingStart?: Date;
    closingEnd?: Date;

    constructor(
      description?: string, id?: string, incidentCode?: IIncidentCodeModel, incidentCodeId?: string,
      localRoute?: ILocalRouteModel, localRouteId?: string, name?: string, closingStart?: Date, closingEnd?: Date
    ) {
        this.description = description;
        this.id = id;
        this.incidentCode = incidentCode;
        this.incidentCodeId = incidentCodeId;
        this.localRoute = localRoute;
        this.localRouteId = localRouteId;
        this.name = name;
        this.closingStart = closingStart;
        this.closingEnd = closingEnd;
    }
}

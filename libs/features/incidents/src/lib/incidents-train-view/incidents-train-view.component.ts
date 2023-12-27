import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AccountModel, IIncidentModel, ITrainForScheduleModel, ITrainModel} from "@rtrain/domain/models";
import {
  IncidentService,
  TrainService
} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {Store} from "@ngrx/store";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {ActivatedRoute} from "@angular/router";
import {Table} from "primeng/table";
import {DelayDescriptionService} from "../../../../../api/services/delay-description.service";
import {
  DelayDescriptionModel,
  IDelayDescriptionModel
} from "../../../../../domain/models/delayDescriptionModels/delay-description.model";

@Component({
  selector: 'rtrain-incidents-train-view',
  templateUrl: './incidents-train-view.component.html',
  styleUrls: ['./incidents-train-view.component.css'],
})
export class IncidentsTrainViewComponent {
  account$: Observable<AccountModel | null>;
  account: AccountModel | null | undefined;


  incident: IIncidentModel | undefined;
  trainsForSchedule: ITrainForScheduleModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';

  showModal = false;
  currentTrain: ITrainForScheduleModel | undefined;
  delayDescription = ''
  delayDescriptions: IDelayDescriptionModel[] = []
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private store: Store<AuthState>,
    private trainService: TrainService,
    private incidentService: IncidentService,
    private delayDescriptionService: DelayDescriptionService
  ) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.account = acc;
    })
  }

  ngOnInit() {
    this.loadIncident()
  }

  loadIncident(){
    const incidentId = this.activatedRoute.snapshot.paramMap.get("incidentId");
    if (incidentId)
    this.incidentService.getById(incidentId).subscribe({
      next: (res) => {
        if (res.body) this.incident = res.body;
      }
    })
  }

  loadDelayDescriptions(){
    const incidentId = this.activatedRoute.snapshot.paramMap.get("incidentId");
    if (this.currentTrain && this.currentTrain.id && incidentId)
    this.delayDescriptionService.getAllByIncidentIdAndtrainForScheduleId(incidentId, this.currentTrain.id).subscribe({
      next: (res) => {
        console.log(res.body)
        if (res.body) this.delayDescriptions = res.body;
      }
    })
  }


  loadTrains(event?: any) {
    const incidentId = this.activatedRoute.snapshot.paramMap.get("incidentId");
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }
    setTimeout(() => {
      if (this.account){
        this.trainService.findTrainsAsociatedWithIncident(incidentId, this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe({
          next: (res) => {
            if (res.body) {
              this.trainsForSchedule = res.body.data;
              this.totalRecords = res.body.totalRecords;
            }
          },
          error: (err) => {
            console.error(err)
            this.loading = false;
          },
          complete: () => this.loading = false
        })
      }
    }, 100);

  }


  clear(table: Table, filterInput: any) {
    filterInput.value = ''
    this.globalFilter = ''
    table.clear();
  }

  filter($event: any, dt1: Table) {
    dt1.filterGlobal($event.value, 'contains')
  }


  save() {
    this.showModal = false;
    console.log(this.currentTrain)
    console.log(this.delayDescription)
    if (this.currentTrain && this.delayDescription ) {
      const objToSave: IDelayDescriptionModel = new DelayDescriptionModel(
        this.delayDescription,
        undefined,
        undefined,
        this.incident?.id,
        undefined,
        this.currentTrain.id
      );
      this.delayDescriptionService.create(objToSave).subscribe({
        error: (err) => {
          console.error(err)
          this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Podczas operacji wystąpił błąd'})
        },
        complete: () => {
          this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zapisano opis opóźnienia'})
        }
      })
    }
  }
  openDialog(currentTrain: ITrainForScheduleModel | undefined) {
    this.delayDescription = ''
    this.currentTrain = currentTrain;
    this.showModal = true;
    this.loadDelayDescriptions();
  }

}

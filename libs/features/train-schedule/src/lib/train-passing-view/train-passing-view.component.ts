import {Component, OnInit} from '@angular/core';
import {IStationModel, ITrainModel, TrainModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {StationService, TrainForScheduleService, TrainService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {
  ITrainForScheduleModel,
  TrainForScheduleModel
} from "@rtrain/domain/models";


@Component({
  selector: 'rtrain-train-passing-view',
  templateUrl: './train-passing-view.component.html',
  styleUrls: ['./train-passing-view.component.css'],
})
export class TrainPassingViewComponent implements OnInit {
  avaliableTrains: ITrainModel[] = [];
  trainsForSchedule: ITrainForScheduleModel[] = []
  stations: IStationModel[] = [];
  trainForSchedule: ITrainForScheduleModel = new TrainForScheduleModel()

  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  lineId = '';
  visible= false;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';
  private currentTrain: ITrainModel = new TrainModel();

  constructor(
    private trainService: TrainService,
    private stationService: StationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private trainForScheduleService: TrainForScheduleService
  ) {}

  ngOnInit() {
    this.lineId = this.activatedRoute.snapshot.paramMap.get("lineID")!;
    this.loadTrains();
    this.loadStationsForLine();

  }

  loadStationsForLine(){
    if (this.lineId) this.stationService.getAllStationsForGivenLine(this.lineId).subscribe({
      next: (res) => {
        if (res && res.body) this.stations = res.body
      },
      error: (error) => {
        console.error(error)
      },

    })
  }

  loadTrainsForSchedule(trains: ITrainModel[]){
    this.trainForScheduleService.getAllByLine(this.lineId).subscribe({
      next: (res) => {
        if (res.body) this.trainsForSchedule = res.body
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.message });
        console.error(error)
      },
      complete: () => this.equalizeLists(trains)
    })
  }

  loadTrains(event?: any) {
    this.loading = true;
    let trains: ITrainModel[] = []
    this.trainService.getTrainsForCurrentUserTransportCompany().subscribe(
      response => {
        if (response.body) {
          trains = response.body.data;
          this.totalRecords = response.body.totalRecords;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      },
      () => {
        this.loadTrainsForSchedule(trains);
      }
    );
  }
  equalizeLists(trains: ITrainModel[]){
    this.avaliableTrains = trains.filter(avaTrain => !this.trainsForSchedule.some(tFS => tFS.train?.id === avaTrain.id))
  }
  clear(table: Table, filterInput: any) {
    filterInput.value = ''
    this.globalFilter = ''
    table.clear();
  }

  filter($event: any, dt1: Table) {
    dt1.filterGlobal($event.value, 'contains')
  }

  showDialog(train: ITrainModel){
    this.visible = true;
    this.currentTrain = train;
  }

  submitMove() {
    this.trainForSchedule.active = true;
    this.trainForSchedule.train = this.currentTrain;
    if (!this.trainForSchedule.isOnce) this.trainForSchedule.isOnce = false;
    this.trainForSchedule.lineId = this.lineId;
    this.trainsForSchedule.push(this.trainForSchedule);
    this.avaliableTrains = this.avaliableTrains.filter(train => train.id !== this.trainForSchedule.train?.id)
    this.trainForSchedule = new TrainForScheduleModel();
    this.visible = false;
  }

  submitBack(trainForSchedule: ITrainForScheduleModel){
    this.avaliableTrains.push(trainForSchedule.train!)
    this.trainsForSchedule = this.trainsForSchedule.filter(tfS => tfS.train?.id !== trainForSchedule.train?.id)
  }

  submit() {
    const objectToSave: ITrainForScheduleModel[] = JSON.parse(JSON.stringify(this.trainsForSchedule))
    objectToSave.forEach(tFS => {
      tFS.fromStationId = tFS.fromStation?.id
      tFS.fromStation = undefined
      tFS.toStationId = tFS.toStation?.id
      tFS.toStation = undefined
      tFS.trainId = tFS.train?.id
      tFS.train = undefined
    })
    this.trainForScheduleService.updateList(objectToSave).subscribe({
      next: (res) => {
        if(res.body) this.trainsForSchedule = res.body;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.message });
        console.error(error)
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: "Pomyślnie przekazano pociągi" });
      }
    })
  }
}

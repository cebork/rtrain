import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LineService, LocalRouteService, StationService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {
  ILineModel,
  ILocalRouteModel,
  IStationModel,
  LineModel,
  LocalRouteModel,
  StationModel
} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'rtrain-connections-create-view-edit',
  templateUrl: './connections-create-view-edit.component.html',
  styleUrls: ['./connections-create-view-edit.component.css'],
})
export class ConnectionsCreateViewEditComponent implements OnInit{
  @ViewChild('formRef') form!: NgForm;

  isView = false;
  line: ILineModel = new LineModel();
  currentlyEditedLocalRoute: LocalRouteModel = new LocalRouteModel();
  stations: IStationModel[] = []
  filtredStations: IStationModel[] = [];
  selectedStationId: string | undefined = undefined;
  selectedDistance = 0;
  selectedOneWay = undefined;
  editedIndex = -1;
  isEdited = false;
  isBelow= false;
  localRoutes: ILocalRouteModel[] = []
  restOfDistanceAvaliable = 0;
  savedSateBeforeUpdate: ILocalRouteModel[] = [];



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lineService: LineService,
    private messageService: MessageService,
    private stationService: StationService,
    private localRouteService: LocalRouteService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView()
    this.getLine();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  loadStations(){
    this.stationService.getAllForConnections().subscribe({
      next: (data) => {
        if (data.body) {
          this.stations = data.body;
          this.filtredStations = this.stations.filter(s => s.id !== this.line.rightEdgeStationId)
          this.filtredStations = this.filtredStations.filter(s => s.id !== this.line.leftEdgeStationId)
        }
      }
    });
  }

  getLocalRoutes() {
    this.localRouteService.getAllForLine(this.line.id!).subscribe({
      next: (data) => {
        if (data.body) this.localRoutes = data.body;
      },
      complete: () => {
        this.filtredStations = this.stations.filter(s => !this.localRoutes.map(lR => lR.fromStationId).includes(s.id))
        this.filtredStations = this.filtredStations.filter(s => !this.localRoutes.map(lR => lR.toStationId).includes(s.id))
        this.restOfDistanceAvaliable = this.localRoutes[this.localRoutes.length - 1].distance!;
      }
    })
  }
  getLine(){
    const lineId = this.activatedRoute.snapshot.paramMap.get("id");
    if (lineId) this.lineService.getById(lineId).subscribe({
      next: data => {
        if (data.body) this.line = data.body
      },
      complete: () => {
        if (this.line.distance) this.restOfDistanceAvaliable = this.line.distance
        this.loadStations()
        this.getLocalRoutes();
      }
    });
  }

  submit() {
    this.setDefaultIfEmpty()
    this.localRouteService.saveFromList(this.localRoutes, this.line.id!).subscribe({
      next: (data) => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyslnie dodano połączenia' });
        this.router.navigate(['admin/connections']);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/connections']);
      }
    });
  }


  setDefaultIfEmpty(){
    if (this.localRoutes.length === 0) {
      const localRoute = new LocalRouteModel();
      localRoute.oneWay = false;
      localRoute.fromStationId = this.line.leftEdgeStationId;
      localRoute.toStationId = this.line.rightEdgeStationId;
      localRoute.order = 1;
      localRoute.lineId = this.line.id;
      localRoute.routeProblem = false;
      localRoute.distance = this.line.distance;
      this.localRoutes.push(localRoute);
    }
  }

  updateIndexesBelow(index: number, type: 'add' | 'remove'){
    if (type === 'add'){
      for (let i = index; i < this.localRoutes.length; i++) {
        const tempOrder= this.localRoutes[i].order
        if (tempOrder) this.localRoutes[i].order = tempOrder + 1;
      }
    }
    if (type === 'remove') {
      for (let i = index; i < this.localRoutes.length; i++) {
        const tempOrder= this.localRoutes[i].order
        if (tempOrder) this.localRoutes[i].order = tempOrder - 1;
      }
    }
  }

  addBelow(index: number) {
    this.savedSateBeforeUpdate = JSON.parse(JSON.stringify(this.localRoutes))
    this.editedIndex = index;
    this.isEdited = true;
    this.isBelow = true;
    if (this.localRoutes.length === 0 || this.localRoutes.length === 1) this.addFirstStation()
    else {
      this.editedIndex = index + 1;
      this.updateIndexesBelow(index + 1, 'add')
      this.currentlyEditedLocalRoute = new LocalRouteModel();
      this.currentlyEditedLocalRoute.fromStationId = this.localRoutes[index].toStationId;
      this.currentlyEditedLocalRoute.fromStation = this.localRoutes[index].toStation;
      this.currentlyEditedLocalRoute.order = index + 2;
      this.currentlyEditedLocalRoute.lineId = this.line.id;
      this.localRoutes.splice(index+1, 0, this.currentlyEditedLocalRoute);
      this.localRoutes[index + 2].fromStation = new StationModel();
      this.localRoutes[index + 2].fromStationId = undefined;
    }
  }

  changeValues(index: number){
    this.localRoutes[index].toStationId = this.selectedStationId;
    this.localRoutes[index].toStation = this.stations.find(s => s.id === this.selectedStationId)
    this.localRoutes[index].distance = this.selectedDistance;
    this.localRoutes[index].oneWay = this.selectedOneWay;

    this.localRoutes[index + 1].fromStationId = this.selectedStationId;
    this.localRoutes[index + 1].fromStation = this.stations.find(s => s.id === this.selectedStationId)
    const tempDistance = this.localRoutes[this.localRoutes.length - 1].distance
    if (tempDistance) this.localRoutes[this.localRoutes.length - 1].distance = tempDistance - this.selectedDistance;
    this.restOfDistanceAvaliable -= this.selectedDistance;
  }

  addFirstStation(){
    if (this.localRoutes.length === 0) {
      this.localRoutes.push(new LocalRouteModel(undefined, this.line.leftEdgeStation, this.line.leftEdgeStationId, undefined, this.line.id, undefined, 1, false, undefined, undefined))
      this.localRoutes.push(new LocalRouteModel(this.line.distance, undefined, undefined, undefined, this.line.id, false, 2, false, this.line.rightEdgeStation, this.line.rightEdgeStationId))
    }
    if (this.localRoutes.length === 1) {
      this.localRoutes[0].toStation = undefined;
      this.localRoutes[0].toStationId = undefined;
      this.localRoutes[0].oneWay = undefined;
      this.localRoutes[0].distance = undefined;
      this.localRoutes.push(new LocalRouteModel(this.line.distance, undefined, undefined, undefined, this.line.id, false, 2, false, this.line.rightEdgeStation, this.line.rightEdgeStationId))
    }
  }

  addNew(idx: number) {
    if (this.selectedDistance >= this.restOfDistanceAvaliable || this.selectedDistance <= 0){
      this.messageService.add({severity: 'warn', summary: 'Uwaga', detail: 'Długość odcinka przekracza dlugość linii'})
    } else if (this.selectedOneWay === undefined) {
      this.messageService.add({severity: 'warn', summary: 'Uwaga', detail: 'Nie ustawiono wartośći dla pola "Czy jeden tor?"'})
    } else {
      this.changeValues(idx)
      this.isEdited = false;
      this.editedIndex = -1;
      this.isBelow = false;
      this.selectedDistance = 0;
      this.selectedOneWay = undefined
      this.selectedStationId = undefined;
      this.filterStations();
    }

  }

  filterStations(){
    this.filtredStations = this.stations.filter(s => !this.localRoutes.map(lR => lR.fromStationId).includes(s.id))
    this.filtredStations = this.filtredStations.filter(s => !this.localRoutes.map(lR => lR.toStationId).includes(s.id))
  }


  displayOneWay(localRoute: ILocalRouteModel): string {
    if (localRoute.oneWay !== undefined) {
      return localRoute.oneWay ? 'TAK' : 'NIE';
    }
    return '';
  }

  remove(idx: number) {
    this.localRoutes[idx + 1].fromStationId = this.localRoutes[idx].fromStationId;
    this.localRoutes[idx + 1].fromStation = this.localRoutes[idx].fromStation;
    this.localRoutes[idx + 1].distance = this.localRoutes[idx + 1].distance! + this.localRoutes[idx].distance!
    this.filtredStations.push(this.localRoutes[idx].toStation!)
    this.restOfDistanceAvaliable += this.localRoutes[idx].distance!
    this.removeElementFromList(idx);
    this.updateIndexesBelow(idx, 'remove')
  }

  removeElementFromList(index: number){
    if (index > -1 && index < this.localRoutes.length) {
      this.localRoutes.splice(index, 1);
    }
  }

  discard(){
    this.localRoutes = JSON.parse(JSON.stringify(this.savedSateBeforeUpdate))
    this.isEdited = false;
    this.editedIndex = -1;
    this.isBelow = false;
    this.selectedDistance = 0;
    this.selectedOneWay = undefined
    this.selectedStationId = undefined;
  }
}

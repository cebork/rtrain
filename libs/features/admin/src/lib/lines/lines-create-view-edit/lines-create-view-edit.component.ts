import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ILineModel,
  IStationModel,
  LineModel,
  LocalizationModel,
  StationModel,
  TransportCompanyModel
} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {LineService, StationService, TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";
import {line} from "d3";

@Component({
  selector: 'rtrain-lines-create-view-edit',
  templateUrl: './lines-create-view-edit.component.html',
  styleUrls: ['./lines-create-view-edit.component.css'],
})
export class LinesCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  line: ILineModel = new LineModel();
  isView = false;

  stations: IStationModel[] = [];

  leftEdgeStations: IStationModel[] = [];
  rightEdgeStations: IStationModel[] = [];
  rightDisabled = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lineService: LineService,
    private messageService: MessageService,
    private stationService: StationService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getLine();
    this.loadStations()
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getLine(){
    const lineId = this.activatedRoute.snapshot.paramMap.get("id");
    if (lineId) this.lineService.getById(lineId).subscribe({
      next: data => {
        if (data.body) this.line = data.body
      }
    });
  }

  loadStations(){
    this.stationService.getAllForLines().subscribe({
      next: (data) => {
        if (data.body) {
          this.stations = data.body;
          this.leftEdgeStations = data.body;
          this.rightEdgeStations = data.body;
        }
      }
    });
  }


  save(){
    this.line.active = true;
    this.lineService.create(this.line).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/lines']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano linie' });
        this.router.navigate(['admin/lines']);
      }
    });
  }

  update(){
    this.line.leftEdgeStation = undefined;
    this.line.rightEdgeStation = undefined;
    this.lineService.update(this.line).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/lines']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano linie' });
        this.router.navigate(['admin/lines']);
      }
    });
  }

  submit(){
    console.log(this.line)
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }

  setStationsForRightEdge() {
    this.rightEdgeStations = this.stations.filter(s => s.id !== this.line.leftEdgeStationId);
    this.line.rightEdgeStationId = undefined;
    this.rightDisabled = false;
  }
}

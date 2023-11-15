import {Component, OnInit, ViewChild} from '@angular/core';
import {IStationModel, LocalizationModel, StationModel, TransportCompanyModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {StationService, TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-station-create-view-edit',
  templateUrl: './station-create-view-edit.component.html',
  styleUrls: ['./station-create-view-edit.component.css'],
})
export class StationCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  station: IStationModel = new StationModel();
  isView = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stationService: StationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getStation();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getStation(){
    const userId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userId) this.stationService.getById(userId).subscribe({
      next: data => {
        if (data.body) this.station = data.body
      }
    });

  }

  save(){
    this.station.active = true;
    this.stationService.create(this.station).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/stations']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano stacje' });
        this.router.navigate(['admin/stations']);
      }
    });
  }

  update(){
    this.stationService.update(this.station).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/stations']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano stacje' });
        this.router.navigate(['admin/stations']);
      }
    });
  }

  submit(){
    console.log(this.station)
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

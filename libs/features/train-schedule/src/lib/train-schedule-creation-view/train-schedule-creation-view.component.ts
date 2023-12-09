import { Component } from '@angular/core';
import {ILineModel, ILocalRouteModel} from "@rtrain/domain/models";
import {LineService, LocalRouteService, TrainForScheduleService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {ActivatedRoute} from "@angular/router";
import {ITrainForScheduleModel} from "@rtrain/domain/models";

@Component({
  selector: 'rtrain-train-schedule-creation-view',
  templateUrl: './train-schedule-creation-view.component.html',
  styleUrls: ['./train-schedule-creation-view.component.css'],
})
export class TrainScheduleCreationViewComponent {
  trainForScheduleModels: ITrainForScheduleModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';

  lineId= ''
  line: ILineModel | undefined;

  constructor(
    private trainForScheduleService: TrainForScheduleService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private lineService: LineService
  ) {}

  ngOnInit() {
    this.lineId = this.activatedRoute.snapshot.paramMap.get("lineID")!;
    this.loadTrainsForSchedule();
    this.loadLine();
  }

  loadTrainsForSchedule(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.trainForScheduleService.getAllForLineTrainSchedule(this.lineId, this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.trainForScheduleModels = response.body.data;
          console.log(this.trainForScheduleModels)
          this.totalRecords = response.body.totalRecords;
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  clear(table: Table, filterInput: any) {
    filterInput.value = ''
    this.globalFilter = ''
    table.clear();
  }

  filter($event: any, dt1: Table) {
    dt1.filterGlobal($event.value, 'contains')
  }

  loadLine(){
    this.lineService.getById(this.lineId).subscribe({
      next: (data) => {
        if (data.body) this.line = data.body;
      }
    })
  }
}

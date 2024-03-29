import {Component, OnInit} from '@angular/core';
import {ILineModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {LineService, StationService, TransportCompanyService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {RoleConstant} from "@rtrain/util";


@Component({
  selector: 'rtrain-train-schedule-home',
  templateUrl: './train-shedule-home.component.html',
  styleUrls: ['./train-shedule-home.component.css'],
})
export class TrainSheduleHomeComponent implements OnInit {
  lines: ILineModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';

  trainScheduleRoles = [RoleConstant.TrainScheduleDispatcher]
  transportCompanyRoles = [RoleConstant.TransportCompanyWorker]

  constructor(
    private lineService: LineService,
    private messageService: MessageService
  ) {}

  ngOnInit() {}

  loadLines(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.lineService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.lines = response.body.data;
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

  delete(userId: string) {
    this.lineService.delete(userId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadLines()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie usunięto przewoźnika' });
      }
    })
  }

}

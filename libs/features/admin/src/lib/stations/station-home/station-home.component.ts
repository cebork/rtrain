import {Component, OnInit} from '@angular/core';
import {IStationModel, IUserModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {StationService, TransportCompanyService} from "@rtrain/api";
import {MessageService} from "primeng/api";


@Component({
  selector: 'rtrain-station-home',
  templateUrl: './station-home.component.html',
  styleUrls: ['./station-home.component.css'],
})
export class StationHomeComponent implements OnInit {
  stations: IStationModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';

  constructor(
    private stationService: StationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadStations();
  }

  loadStations(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.stationService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.stations = response.body.data;
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
    this.stationService.delete(userId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadStations()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie usunięto przewoźnika' });
      }
    })
  }
}

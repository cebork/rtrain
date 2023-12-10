import { Component } from '@angular/core';
import {IFirmModel, IIncidentCodeModel} from "@rtrain/domain/models";
import {FirmService, IncidentCodeService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'rtrain-firms-home',
  templateUrl: './firms-home.component.html',
  styleUrls: ['./firms-home.component.css'],
})
export class FirmsHomeComponent {
  firms: IFirmModel[] = [];
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
    private firmService: FirmService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadFirms();
  }

  loadFirms(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.firmService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.firms = response.body.data;
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

  delete(incidentCodeId: string) {
    this.firmService.delete(incidentCodeId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadFirms()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie usunięto zakład' });
      }
    })
  }
}

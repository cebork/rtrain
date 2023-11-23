import {Component, OnInit} from '@angular/core';
import {IIncidentCodeModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {IncidentCodeService} from "@rtrain/api";
import {MessageService} from "primeng/api";


@Component({
  selector: 'rtrain-incident-codes-home',
  templateUrl: './incident-codes-home.component.html',
  styleUrls: ['./incident-codes-home.component.css'],
})
export class IncidentCodesHomeComponent implements OnInit {
  incidentCodes: IIncidentCodeModel[] = [];
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
    private incidentCodeService: IncidentCodeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadIncidentCodes();
  }

  loadIncidentCodes(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.incidentCodeService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.incidentCodes = response.body.data;
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
    this.incidentCodeService.delete(incidentCodeId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadIncidentCodes()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie kod incydentu' });
      }
    })
  }
}

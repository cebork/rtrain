import {Component, OnInit} from '@angular/core';
import {ITrainTypeModel, ITransportCompanyModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {TrainTypeService } from "@rtrain/api";
import {MessageService} from "primeng/api";


@Component({
  selector: 'rtrain-train-types-home',
  templateUrl: './train-types-home.component.html',
  styleUrls: ['./train-types-home.component.css'],
})
export class TrainTypesHomeComponent implements OnInit {
  transportCompanies: ITrainTypeModel[] = [];
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
    private trainTypeService: TrainTypeService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTrainTypes();
  }

  loadTrainTypes(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.trainTypeService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.transportCompanies = response.body.data;
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

  delete(trainTypeId: string) {
    this.trainTypeService.delete(trainTypeId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadTrainTypes()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie usunięto typ pociągu' });
      }
    })
  }
}

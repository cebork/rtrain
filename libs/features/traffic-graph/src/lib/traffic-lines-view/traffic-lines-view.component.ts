import {Component, OnDestroy, OnInit} from '@angular/core';
import {LineService, SignalRService, UtilService} from "@rtrain/api";
import {ILineModel} from "@rtrain/domain/models";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'rtrain-traffic-lines-view',
  templateUrl: './traffic-lines-view.component.html',
  styleUrls: ['./traffic-lines-view.component.css'],
})
export class TrafficLinesViewComponent implements OnInit{
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

  constructor(
    private lineService: LineService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.loadLines();
  }

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

  openTrafficGraph(lineId: string) {
    this.utilService.openNewTabByPath(`traffic-graph-for-line/${lineId}`)
  }
}

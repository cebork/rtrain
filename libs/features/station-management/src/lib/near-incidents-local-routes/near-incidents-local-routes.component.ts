import {Component, OnInit} from '@angular/core';
import {IncidentCodeService, IncidentService, LineService, LocalRouteService} from "@rtrain/api";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {
  AccountModel,
  IIncidentCodeModel,
  IIncidentModel,
  ILineModel,
  ILocalRouteModel,
  IncidentModel
} from "@rtrain/domain/models";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";

@Component({
  selector: 'rtrain-near-incidents-local-routes',
  templateUrl: './near-incidents-local-routes.component.html',
  styleUrls: ['./near-incidents-local-routes.component.css'],
})
export class NearIncidentsLocalRoutesComponent implements OnInit {

  account$: Observable<AccountModel | null>
  account = new AccountModel();
  line: ILineModel | undefined;
  localRoutes: ILocalRouteModel[] = []

  visibleAdding = false;
  visibleView = false;

  currentLocalRoute: ILocalRouteModel | undefined;
  incident = new IncidentModel()
  incidentCodes: IIncidentCodeModel[] = [];


  incidents: IIncidentModel[] = [];
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
    private localRouteService: LocalRouteService,
    private store: Store<AuthState>,
    private activatedRoute: ActivatedRoute,
    private lineService: LineService,
    private incidentCodeService: IncidentCodeService,
    private incidentService: IncidentService,
    private messageService: MessageService
  ) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.account = acc;
    })
  }

  ngOnInit(): void {
    this.loadLocalRoutes();
    this.loadLine();
    this.loadIncidentCodes();
  }

  loadLocalRoutes(){
    const lineId = this.activatedRoute.snapshot.paramMap.get("lineId");

      setTimeout(() => {
        if (lineId && this.account && this.account.stationId) {
          this.localRouteService.getAllForLineStationLevel(lineId, this.account.stationId).subscribe({
            next: (res) => {
              if (res.body) this.localRoutes = res.body;
            },
            error: (err) => console.error(err)
          })
        }
      }, 100)
  }

  loadLine(){
    const lineId = this.activatedRoute.snapshot.paramMap.get("lineId");
    if (lineId) {
      this.lineService.getById(lineId).subscribe({
        next: (res) => {
          if (res.body) this.line = res.body;
        },
        error: (err) => console.error(err)
      })
    }
  }

  loadIncidentCodes(){
    this.incidentCodeService.getRawIncidentCodes().subscribe({
      next: (res) => {
        if (res.body) this.incidentCodes = res.body;
      },
      error: (err) => console.error(err)
    })
  }

  openAddingModal(localRoute: ILocalRouteModel){
    this.visibleAdding = true;
    this.currentLocalRoute = localRoute;
  }

  openViewModal(localRoute: ILocalRouteModel){
    this.visibleView = true;
    this.currentLocalRoute = localRoute;
    this.loadIncidents();
  }

  addEvent() {
    this.incident.localRouteId = this.currentLocalRoute?.id;
    this.incidentService.create(this.incident).subscribe({
      error: (err) => {
        this.messageService.add({severity: "error", summary: "Błąd", detail: "Wystąpił błąd podczas zapisywania"})
      },
      complete: () => {
        this.messageService.add({severity: "success", summary: "Sukces", detail: "Pomyslnie wykonano operacje"})
        this.visibleAdding = false;
        this.incident = new IncidentModel();
      }
    })
  }

  loadIncidents(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    if (this.currentLocalRoute && this.currentLocalRoute.id)
    this.incidentService.getAllForLocalRoute(this.currentLocalRoute.id, this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
        response => {
          if (response.body) {
            this.incidents = response.body.data;
            this.totalRecords = response.body.totalRecords;
            console.log(this.totalRecords)
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

}

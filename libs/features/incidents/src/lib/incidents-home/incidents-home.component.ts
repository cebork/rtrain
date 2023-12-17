import {Component, OnInit} from '@angular/core';
import {AccountModel, IGenericGetAllModelModel, IIncidentCodeModel, IIncidentModel} from "@rtrain/domain/models";
import {AccessService, IncidentCodeService, IncidentService} from "@rtrain/api";
import {MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {Store} from "@ngrx/store";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Observable} from "rxjs";
import {RoleConstant} from "@rtrain/util";
import {HttpResponse} from "@microsoft/signalr";

@Component({
  selector: 'rtrain-incidents-home',
  templateUrl: './incidents-home.component.html',
  styleUrls: ['./incidents-home.component.css'],
})
export class IncidentsHomeComponent implements OnInit {
  account$: Observable<AccountModel | null>;
  account: AccountModel | null | undefined;



  firms: IIncidentModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'id';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'id';
  sortOrder = 'asc';
  globalFilter = '';
  isLineDispatcher = false;

  showModal = false;
  currentIncident: IIncidentModel | undefined;
  incidentCodes: IIncidentCodeModel[] = [];

  constructor(
    private incidentService: IncidentService,
    private messageService: MessageService,
    private store: Store<AuthState>,
    private accessService: AccessService,
    private incidentCodeService: IncidentCodeService
  ) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.account = acc;
    })
  }

  ngOnInit() {
    this.loadIncidentCodes();
    this.checkIfLineDispatcher();
  }

  checkIfLineDispatcher(){
    setTimeout(() => {
      this.accessService.hasAnyAuthority([RoleConstant.LineDispatcher]).subscribe(hasAuth => {
        this.isLineDispatcher = hasAuth
      },
        (err) => console.error(err),
        () => this.loadIncidents())
    }, 100);

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
    setTimeout(() => {
      if (this.account){
        let id = '';
        if (this.isLineDispatcher && this.account.lineId) id = this.account.lineId;
        if (!this.isLineDispatcher && this.account.firmId) id = this.account.firmId;
        this.changeViewForLineOrView(id).subscribe(
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
    }, 100);

  }

  changeViewForLineOrView(id: string) {
    return this.isLineDispatcher ?
      this.incidentService.getAllForLine(id, this.page, this.size, this.sortField, this.sortOrder, this.globalFilter) :
      this.incidentService.getAllForFirm(id, this.page, this.size, this.sortField, this.sortOrder, this.globalFilter)

  }

  loadIncidentCodes(): void{
    this.incidentCodeService.getRawIncidentCodes().subscribe({
      next: (res) => {
        if (res.body) this.incidentCodes = res.body;
      }
    })
  }

  clear(table: Table, filterInput: any) {
    filterInput.value = ''
    this.globalFilter = ''
    table.clear();
  }

  filter($event: any, dt1: Table) {
    dt1.filterGlobal($event.value, 'contains')
  }

  openModalWindow(incident: IIncidentModel) {
    this.showModal = true;
    this.currentIncident = incident;
    if (this.currentIncident) {
      if (this.currentIncident.closingStart) this.currentIncident.closingStart = new Date(this.currentIncident.closingStart)
      if (this.currentIncident.closingEnd) this.currentIncident.closingEnd = new Date(this.currentIncident.closingEnd)
    }
  }

  save() {
    this.showModal = false;
    if (this.currentIncident ) {
      const objToSave: IIncidentModel = {...this.currentIncident}
      objToSave.localRoute = undefined;
      this.incidentService.update(objToSave).subscribe({
        error: (err) => {
          console.error(err)
          this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Podczas operacji wystąpił błąd'})
        },
        complete: () => {
          this.messageService.add({severity: 'success', summary: 'Sukces', detail: 'Pomyślnie wykonano operację'})
        }
      })
    }

  }

  createClosing() {
    if (this.currentIncident && this.currentIncident.createdDate) this.currentIncident.closingStart = new Date(this.currentIncident.createdDate.toString());
  }

  removeClosing() {
    if (this.currentIncident) this.currentIncident.closingStart = null;
  }
}

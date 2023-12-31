import {Component, OnInit, ViewChild, ViewRef} from '@angular/core';
import {IFirmModel, ILineModel, IStationModel, IUserModel, UserModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {FirmService, LineService, RoleService, StationService, TransportCompanyService, UserService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";
import {IRoleModel} from "@rtrain/domain/models";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {RoleConstant} from "@rtrain/util";

@Component({
  selector: 'rtrain-user-create-view-edit',
  templateUrl: './user-create-view-edit.component.html',
  styleUrls: ['./user-create-view-edit.component.css'],
})
export class UserCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  user: IUserModel = new UserModel();
  isView = false;
  transportCompanies: ITransportCompanyModel[] = [];
  stations: IStationModel[] = [];
  roles: IRoleModel[] = [];
  firms: IFirmModel[] = [];
  lines: ILineModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private transportCompanyService: TransportCompanyService,
    private messageService: MessageService,
    private roleService: RoleService,
    private stationService: StationService,
    private firmService: FirmService,
    private lineService: LineService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getUser();
    this.loadTransportCompany();
    this.loadRoles();
    this.loadStations();
    this.loadFirms();
    this.loadLines();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getUser(){
    const userId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userId) this.userService.getById(userId).subscribe({
      next: data => {
        if (data.body) this.user = data.body
      },
      complete: () => {
        if (this.user.transportCompanyId === null) this.user.transportCompanyId = undefined;
        if (this.user.stationId === null) this.user.stationId = undefined;
        if (this.user.lineId === null) this.user.lineId = undefined;
      }
    });

  }

  loadTransportCompany() {

    // Default values
    const page = 0;
    const size = 9999;
    const sortField = 'name';
    const sortOrder = 'asc';
    const globalFilter = '';

    this.transportCompanyService.getAll(page, size, sortField, sortOrder, globalFilter).subscribe(
      response => {
        if (response.body) {
          this.transportCompanies = response.body.data;
        }
      }
    );
  }

  loadRoles(){
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        if(data && data.body) this.roles = data.body
      }
    })
  }

  loadStations(){
    this.stationService.getAllForLines().subscribe({
      next: (res) => {
        if (res.body) this.stations = res.body;
      }
    })
  }

  save(){
    this.user.active = true;
    this.userService.create(this.user).subscribe({
      next: (data) => {
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.userExists === true){
          this.messageService.add({ severity: 'warn', summary: 'Uwaga', detail: 'Nazwa użytkownika jest zajęta' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.message });
          this.router.navigate(['admin/users']);
        }

      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano użytkownika' });
        this.router.navigate(['admin/users']);
      }
    });
  }

  update(){
    console.log(this.user)
    this.userService.update(this.user).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/users']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano użytkownika' });
        this.router.navigate(['admin/users']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }

  selectingRoles(role: IRoleModel){

    if (this.user && this.user.roles && this.checkIfUserContainsRole(role.name!)) {
      this.user.roles = this.removeItem(role, this.user.roles)
    } else {
      if (this.user && this.user.roles) this.user.roles.push(role)
    }
  }

  removeItem(itemToRemove: IRoleModel, list: IRoleModel[]) {
    return list.filter(item => item.name !== itemToRemove.name);
  }

  checkIfUserContainsRole(roleName: string): boolean {
    if (this.user.roles)
    return this.user?.roles?.some(r => r.name === roleName)
    return false;
  }

  loadFirms() {
    this.firmService.getRawForDropdown().subscribe({
      next: (res) => {
        if (res.body) this.firms = res.body;
      }
    })
  }

  loadLines(){
    this.lineService.getRawForDropdown().subscribe({
      next: (res) => {
        if (res.body) this.lines = res.body;
      }
    })
  }

  translateRoleName(name: string | undefined): string {
    switch (name){
      case RoleConstant.LineDispatcher:
        return "Dyspozytor liniowy"
      case RoleConstant.TransportCompanyWorker:
        return "Pracownik przewoźnika"
      case RoleConstant.TrainScheduleDispatcher:
        return "Dyspozytor tworzący rozkłady jazdy"
      case RoleConstant.Admin:
        return "Administrator"
      case RoleConstant.ContributorDispatcher:
        return "Dyspozytor zakładowy"
      case RoleConstant.TrafficDispatcher:
        return "Dyżurny ruchu"
      default:
        return ""
    }
  }
}

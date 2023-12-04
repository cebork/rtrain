import {Component, OnInit, ViewChild, ViewRef} from '@angular/core';
import {IUserModel, UserModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService, TransportCompanyService, UserService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";
import {IRoleModel} from "@rtrain/domain/models";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

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
  roles: IRoleModel[] = [];

  selectedRoles: IRoleModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private transportCompanyService: TransportCompanyService,
    private messageService: MessageService,
    private roleService: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getUser();
    this.loadTransportCompany();
    this.loadRoles();
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
    // console.log(this.user)
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
}

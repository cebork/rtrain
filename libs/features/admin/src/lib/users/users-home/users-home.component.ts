import {Component, OnInit} from '@angular/core';
import {IUserModel} from "@rtrain/domain/models";
import {Table} from "primeng/table";
import {UserService} from "@rtrain/api";
import {MenuItem, MessageService} from "primeng/api";


@Component({
  selector: 'rtrain-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.css'],
})
export class UsersHomeComponent implements OnInit {
  users: IUserModel[] = [];
  loading = true;
  totalRecords = 0;
  defaultSortField = 'firstName';
  defaultSortOrder = 1;

  page = 0;
  size = 10;
  sortField = 'firstName';
  sortOrder = 'asc';
  globalFilter = '';

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(event?: any) {
    this.loading = true;

    if (event) {
      this.page = event.first / event.rows;
      this.size = event.rows;
      this.sortField = event.sortField ? event.sortField : this.sortField;
      this.sortOrder = event.sortOrder === 1 ? 'asc' : 'desc';
      this.globalFilter = event.globalFilter ? event.globalFilter : this.globalFilter;
    }

    this.userService.getAll(this.page, this.size, this.sortField, this.sortOrder, this.globalFilter).subscribe(
      response => {
        if (response.body) {
          this.users = response.body.data;
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
    this.globalFilter = ''
    filterInput.value = ''
    table.clear();
  }

  filter($event: any, dt1: Table) {
    dt1.filterGlobal($event.value, 'contains')
  }

  delete(userId: string) {
    this.userService.delete(userId).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sukces', detail: error.message });
      },
      complete: () => {
        this.loadUsers()
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie usunięto użytkownika' });
      }
    })
  }
}

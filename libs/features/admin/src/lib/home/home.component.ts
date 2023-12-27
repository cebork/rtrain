import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router, RoutesRecognized} from "@angular/router";
import {RoleConstant} from "@rtrain/util";
import {AccessService} from "@rtrain/api";
import {catchError, forkJoin, map, mergeMap, of, tap} from "rxjs";
import {AccountModel} from "@rtrain/domain/models";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rtrain-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  items: MenuItem[] | undefined;
  account: AccountModel | undefined | null;
  constructor(
    private router: Router,
    private accessService: AccessService,
    private store: Store<AuthState>
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        console.log(event);
      }
    });

    this.store.select(getAccount).subscribe({
      next: (acc) => this.account = acc
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.createMenu();
    },100)

  }

  createMenu(){
    this.items = [
      {
        roles: [RoleConstant.TransportCompanyWorker.toString()],
        label: 'Administracja przewoźnika',
        items: [
          {
            roles: [RoleConstant.TransportCompanyWorker.toString()],
            label: 'Zarządzanie pociągami',
            icon: 'fas fa-train',
            command: () => this.navigate("/admin/trains")
          },
          {
            roles: [RoleConstant.TransportCompanyWorker.toString()],
            label: 'Zarządzanie typami pociągów',
            icon: 'fa-brands fa-squarespace',
            command: () => this.navigate("/admin/train-types")
          }
        ]
      },
      {
        roles: [RoleConstant.TrainScheduleDispatcher.toString()],
        label: 'Administracja architektury',
        items: [
          {
            roles: [RoleConstant.TrainScheduleDispatcher.toString()],
            label: 'Zarządzanie stacjami',
            icon: 'fas fa-random',
            command: () => this.navigate("/admin/stations")
          },
          {
            roles: [RoleConstant.TrainScheduleDispatcher.toString()],
            label: 'Zarządzanie liniami',
            icon: 'fas fa-grip-lines',
            command: () => this.navigate("/admin/lines")
          },
          {
            roles: [RoleConstant.TrainScheduleDispatcher.toString()],
            label: 'Zarządzanie zakładami',
            icon: 'fa-solid fa-building',
            command: () => this.navigate("/admin/firms")
          },
          {
            roles: [RoleConstant.TrainScheduleDispatcher.toString()],
            label: 'Zarządzanie połączeniami',
            icon: 'fa-brands fa-connectdevelop',
            command: () => this.navigate("/admin/connections")
          }
        ],
      },
      {
        roles: [RoleConstant.Admin.toString()],
        label: 'Administracja',
        items: [
          {
            roles: [RoleConstant.Admin.toString()],
            label: 'Zarządzanie użytkownikami',
            icon: 'fas fa-people-group',
            command: () => this.navigate("/admin/users")
          },
          {
            roles: [RoleConstant.Admin.toString()],
            label: 'Zarządzanie przewoźnikami',
            icon: 'fas fa-arrow-right-arrow-left',
            command: () => this.navigate("/admin/transport-companies")
          }
        ]
      },
      {
        roles: [RoleConstant.LineDispatcher.toString(), RoleConstant.ContributorDispatcher.toString()],
        label: 'Administracja incydentami',
        items: [
          {
            roles: [RoleConstant.LineDispatcher.toString(), RoleConstant.ContributorDispatcher.toString()],
            label: 'Zarządzanie kodami incydentów',
            icon: 'fa fa-book',
            command: () => this.navigate("/admin/incident-codes")
          }
        ]
      }
    ];
    this.items = this.items.filter(menuItem => this.isVisible(menuItem));
  }


  isVisible(menuItem: any) {
    const userRoles = this.account?.roles?.map(r => r)
    if (menuItem.roles) {
      return userRoles?.some(element => menuItem.roles.includes(element));
    }
    return false;
  }


  navigate(route: string){
    this.router.navigate([route]);
  }
}

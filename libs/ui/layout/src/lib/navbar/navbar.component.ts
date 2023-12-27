import {Component, OnInit} from '@angular/core';
import {AccountModel, MenuItem} from "@rtrain/domain/models";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {RoleConstant} from "@rtrain/util";

@Component({
  selector: 'rtrain-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {
  account$: Observable<AccountModel | null>;

  account: AccountModel | null | undefined;
  visible = false;

  menuItems: MenuItem[] = [
    {
      label: "Rozkłady jazdy",
      icon: "pi pi-fw pi-palette",
      routerLink: "/train-schedule",
      disabled: false,
      roles: [
        RoleConstant.TrainScheduleDispatcher.toString(),
        RoleConstant.TransportCompanyWorker.toString()
      ]
    },
    {
      label: "Stacja",
      icon: "pi pi-fw fa-solid fa-warehouse",
      routerLink: "/station-management",
      disabled: true,
      roles: [
        RoleConstant.TrafficDispatcher.toString()
      ]
    },
    {
      label: "Incydenty",
      icon: "pi pi-fw fa-solid fa-bolt",
      routerLink: "/incidents-home",
      disabled: true,
      roles: [
        RoleConstant.LineDispatcher.toString(),
        RoleConstant.ContributorDispatcher.toString()
      ]
    },
    {
      label: "Wykresy ruchu",
      icon: "pi pi-fw pi-chart-line",
      routerLink: "/traffic-lines-view",
      disabled: true,
      roles: [
        RoleConstant.LineDispatcher.toString(),
        RoleConstant.ContributorDispatcher.toString()
      ]
    }
  ];
  adminPanelRoles: RoleConstant[] = [
    RoleConstant.Admin,
    RoleConstant.LineDispatcher,
    RoleConstant.TrainScheduleDispatcher,
    RoleConstant.TransportCompanyWorker,
    RoleConstant.ContributorDispatcher
  ];

  constructor(
    private store: Store<AuthState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.account$ = this.store.select(getAccount);
  }

  ngOnInit(): void {
    this.account$.subscribe((account: AccountModel | null)=> {
      if (account) this.account = JSON.parse(JSON.stringify(account));
      if (this.account?.image) this.account.image = 'data:image/*;base64,' + this.account.image
      this.visible = !!account;
    })
  }
}


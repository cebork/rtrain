import {Component, OnInit} from '@angular/core';
import {AccountModel} from "@rtrain/domain/models";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthState, getAccount} from "@rtrain/shell/auth";

@Component({
  selector: 'rtrain-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  account$: Observable<AccountModel | null>;

  account: AccountModel | null | undefined;
  visible = false;

  menuItems = [
    {
      label: "Rozkłady jazdy",
      icon: "pi pi-fw pi-palette",
      routerLink: "/train-schedule",
      disabled: false
    },
    {
      label: "Stacja",
      icon: "pi pi-fw fa-solid fa-warehouse",
      routerLink: "/station-management",
      disabled: true
    },
    {
      label: "Incydenty",
      icon: "pi pi-fw fa-solid fa-bolt",
      routerLink: "/incidents-home",
      disabled: true
    },
    {
      label: "Wykresy ruchu",
      icon: "pi pi-fw pi-chart-line",
      routerLink: "/traffic-lines-view",
      disabled: true
    }
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
      this.visible = !!account;
    })
  }
}

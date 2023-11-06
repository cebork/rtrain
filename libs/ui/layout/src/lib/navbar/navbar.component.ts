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
      label: "Test 1",
      icon: "pi pi-fw pi-book",
      routerLink: "/",
      disabled: false
    },
    {
      label: "Test 2",
      icon: "pi pi-fw pi-file",
      routerLink: "/pd",
      disabled: true
    },
    {
      label: "Test 3",
      icon: "pi pi-fw pi-chart-line",
      routerLink: "/risk",
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

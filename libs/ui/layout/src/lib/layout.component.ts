import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthState, getAccount, getLoadingState} from "@rtrain/shell/auth";
import {AccountModel} from "@rtrain/domain/models";
// import {AuthState, getLoadingState} from "@grc/shell/auth";
// import {Store} from "@ngrx/store";

@Component({
  selector: "rtrain-layout",
  styles: [``],
  template: `
    <div class="flex flex-row w-full bg-background-light">
      <rtrain-navbar [ngClass]="navStyles"></rtrain-navbar>
      <div class="w-10/12">
        <ng-content></ng-content>
      </div>
    </div>
    <p-toast></p-toast>
<!--    <grc-loading-screen *ngIf="(loading$ | async)">-->
<!--      <p message>Proszę czekać, trwa ładowanie...</p>-->
<!--    </grc-loading-screen>-->
  `,
})
export class LayoutComponent {
  account$: Observable<AccountModel | null>;
  navStyles = ''
  account: AccountModel | null | undefined;

  constructor(private store: Store<AuthState>) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.navStyles = 'w-2/12';
    })
  }



}

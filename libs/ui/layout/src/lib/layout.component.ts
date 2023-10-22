import {Component} from "@angular/core";
import {Observable} from "rxjs";
// import {AuthState, getLoadingState} from "@grc/shell/auth";
// import {Store} from "@ngrx/store";

@Component({
  selector: "rtrain-layout",
  styles: [``],
  template: `
    <div class="flex flex-row w-full">
      <rtrain-navbar></rtrain-navbar>
      <div class="w-full">
        <ng-content></ng-content>
      </div>
    </div>
<!--    <p-toast></p-toast>-->
<!--    <grc-loading-screen *ngIf="(loading$ | async)">-->
<!--      <p message>Proszę czekać, trwa ładowanie...</p>-->
<!--    </grc-loading-screen>-->
  `,
})
export class LayoutComponent {
  // loading$: Observable<boolean>;

  // constructor(private store: Store<AuthState>) {
  //   this.loading$ = this.store.select(getLoadingState);
  // }

}

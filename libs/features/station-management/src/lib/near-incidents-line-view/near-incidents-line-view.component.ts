import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AccountModel, ILineModel} from "@rtrain/domain/models";
import {LineService} from "@rtrain/api";
import {Store} from "@ngrx/store";
import {AuthState, getAccount} from "@rtrain/shell/auth";

@Component({
  selector: 'rtrain-near-incidents-view',
  templateUrl: './near-incidents-line-view.component.html',
  styleUrls: ['./near-incidents-line-view.component.css'],
})
export class NearIncidentsLineViewComponent implements OnInit{

  account$: Observable<AccountModel | null>

  availableLines: ILineModel[] = []
  account: AccountModel = new AccountModel()


  constructor(
    private lineService: LineService,
    private store: Store<AuthState>
  ) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.account = acc;
    })
  }

  ngOnInit(): void {
    this.loadAvailableLines();
  }

  loadAvailableLines(){
    setTimeout(() => {
        if (this.account && this.account.stationId) {
          this.lineService.getLinesAssociatedWithStation(this.account.stationId).subscribe({
            next: (res) => {
              if (res.body) this.availableLines = res.body;
            }
          })
        }
      }, 100
    )
  }
}

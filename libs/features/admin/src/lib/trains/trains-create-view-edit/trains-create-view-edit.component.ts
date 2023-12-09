import {Component, OnInit, ViewChild} from '@angular/core';
import {AccountModel, ITrainModel, ITrainTypeModel, TrainModel, TransportCompanyModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainService, TrainTypeService, TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rtrain-trains-create-view-edit',
  templateUrl: './trains-create-view-edit.component.html',
  styleUrls: ['./trains-create-view-edit.component.css'],
})
export class TrainsCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  account$: Observable<AccountModel | null>

  trainModel: ITrainModel = new TrainModel();
  isView = false;
  account: AccountModel = new AccountModel()
  trainTypes: ITrainTypeModel[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private trainService: TrainService,
    private messageService: MessageService,
    private trainTypeService: TrainTypeService,
    private store: Store<AuthState>
  ) {
    this.account$ = this.store.select(getAccount);
    this.account$.subscribe(acc => {
      if (acc) this.account = acc;
    })
  }

  ngOnInit(): void {
    this.checkIfView();
    this.loadTrainTypes();
    this.getTrain();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getTrain(){
    const trainId = this.activatedRoute.snapshot.paramMap.get("id");
    if (trainId) this.trainService.getById(trainId).subscribe({
      next: data => {
        if (data.body) this.trainModel = data.body
      }
    });

  }

  loadTrainTypes(){
    this.trainTypeService.getAllForTrain().subscribe({
      next: (data) => {
        if (data.body) this.trainTypes = data.body;
      }
    })
  }

  save(){
    this.trainModel.transportCompanyId = this.account.transportCompanyId;
    // this.trainModel.scheduled = false;
    this.trainModel.active = true;
    this.trainService.create(this.trainModel).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/trains']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano pociąg' });
        this.router.navigate(['admin/trains']);
      }
    });
  }

  update(){
    this.trainService.update(this.trainModel).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/trains']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano pociąg' });
        this.router.navigate(['admin/trains']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

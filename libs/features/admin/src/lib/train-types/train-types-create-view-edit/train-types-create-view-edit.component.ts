import {Component, OnInit, ViewChild} from '@angular/core';
import {ITrainTypeModel, TrainTypeModel, TransportCompanyModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {TrainTypeService, TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-train-types-create-view-edit',
  templateUrl: './train-types-create-view-edit.component.html',
  styleUrls: ['./train-types-create-view-edit.component.css'],
})
export class TrainTypesCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  trainTypeModel: ITrainTypeModel = new TrainTypeModel();
  isView = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private trainTypeService: TrainTypeService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getTrainType();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getTrainType(){
    const trainTyppeId = this.activatedRoute.snapshot.paramMap.get("id");
    if (trainTyppeId) this.trainTypeService.getById(trainTyppeId).subscribe({
      next: data => {
        if (data.body) this.trainTypeModel = data.body
      }
    });

  }

  save(){
    this.trainTypeModel.active = true;
    this.trainTypeService.create(this.trainTypeModel).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/train-types']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano typ pociągu' });
        this.router.navigate(['admin/train-types']);
      }
    });
  }

  update(){
    this.trainTypeService.update(this.trainTypeModel).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/train-types']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano typ pociagu' });
        this.router.navigate(['admin/train-types']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

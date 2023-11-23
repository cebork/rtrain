import {Component, OnInit, ViewChild} from '@angular/core';
import {IIncidentCodeModel, IncidentCodeModel, TransportCompanyModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {IncidentCodeService, TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-incident-code-create-view-edit',
  templateUrl: './incident-codes-create-view-edit.component.html',
  styleUrls: ['./incident-codes-create-view-edit.component.css'],
})
export class IncidentCodesCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  incidentCode: IIncidentCodeModel = new IncidentCodeModel();
  isView = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incidentCodeService: IncidentCodeService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getIncidentCode();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getIncidentCode(){
    const incidentCodeId = this.activatedRoute.snapshot.paramMap.get("id");
    if (incidentCodeId) this.incidentCodeService.getById(incidentCodeId).subscribe({
      next: data => {
        if (data.body) this.incidentCode = data.body
      }
    });

  }

  save(){
    this.incidentCode.active = true;
    this.incidentCodeService.create(this.incidentCode).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/incident-codes']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano kod incydentu' });
        this.router.navigate(['admin/incident-codes']);
      }
    });
  }

  update(){
    this.incidentCodeService.update(this.incidentCode).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/incident-codes']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano kod incydentu' });
        this.router.navigate(['admin/incident-codes']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

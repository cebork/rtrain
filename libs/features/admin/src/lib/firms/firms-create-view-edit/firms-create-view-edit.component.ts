import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {FirmModel, IFirmModel, IIncidentCodeModel, IncidentCodeModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {FirmService, IncidentCodeService} from "@rtrain/api";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-firms-create-view-edit',
  templateUrl: './firms-create-view-edit.component.html',
  styleUrls: ['./firms-create-view-edit.component.css'],
})
export class FirmsCreateViewEditComponent {
  @ViewChild('formRef') form!: NgForm;

  firm: IFirmModel = new FirmModel();
  isView = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private firmService: FirmService,
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
    const firmId = this.activatedRoute.snapshot.paramMap.get("id");
    if (firmId) this.firmService.getById(firmId).subscribe({
      next: data => {
        if (data.body) this.firm = data.body
      }
    });

  }

  save(){
    this.firm.active = true;
    this.firmService.create(this.firm).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/firms']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano zakład' });
        this.router.navigate(['admin/firms']);
      }
    });
  }

  update(){
    this.firmService.update(this.firm).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/firms']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie zmodyfikowano zakład' });
        this.router.navigate(['admin/firms']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

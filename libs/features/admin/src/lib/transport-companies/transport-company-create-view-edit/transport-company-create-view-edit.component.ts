import {Component, OnInit, ViewChild} from '@angular/core';
import {TransportCompanyModel} from "@rtrain/domain/models";
import {ActivatedRoute, Router} from "@angular/router";
import {TransportCompanyService} from "@rtrain/api";
import {ITransportCompanyModel} from "@rtrain/domain/models";
import {NgForm} from "@angular/forms";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-transport-company-create-view-edit',
  templateUrl: './transport-company-create-view-edit.component.html',
  styleUrls: ['./transport-company-create-view-edit.component.css'],
})
export class TransportCompanyCreateViewEditComponent implements OnInit {
  @ViewChild('formRef') form!: NgForm;

  transportCompany: ITransportCompanyModel = new TransportCompanyModel();
  isView = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transportCompanyService: TransportCompanyService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.checkIfView();
    this.getTransportCompany();
  }

  checkIfView(): void {
    const url = this.router.url
    if (url.includes('view')) this.isView = true;
  }

  getTransportCompany(){
    const userId = this.activatedRoute.snapshot.paramMap.get("id");
    if (userId) this.transportCompanyService.getById(userId).subscribe({
      next: data => {
        if (data.body) this.transportCompany = data.body
      }
    });

  }

  save(){
    this.transportCompany.active = true;
    this.transportCompanyService.create(this.transportCompany).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/transport-companies']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano przewoźnika' });
        this.router.navigate(['admin/transport-companies']);
      }
    });
  }

  update(){
    this.transportCompanyService.update(this.transportCompany).subscribe({
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error });
        this.router.navigate(['admin/transport-companies']);
      },
      complete: () => {
        this.messageService.add({ severity: 'success', summary: 'Sukces', detail: 'Pomyślnie dodano przewoźnika' });
        this.router.navigate(['admin/transport-companies']);
      }
    });
  }

  submit(){
    const url = this.router.url
    if (url.includes('create')) this.save();
    else this.update();
  }
}

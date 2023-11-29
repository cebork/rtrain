import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginModel} from "@rtrain/domain/models";
import {AccountService} from "@rtrain/api";
import {
  ActivateAccountModel,
  IActivateAccountModel
} from "../../../../../../domain/models/accountModels/activateAccount.model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'rtrain-create-password-form',
  templateUrl: './create-password-form.component.html',
  styleUrls: ['./create-password-form.component.css'],
})
export class CreatePasswordFormComponent implements OnInit{
  createPasswordForm = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
    ]),
    confirmPassword: new FormControl("", [Validators.required])
  }, { validators: this.passwordMatchValidator });

  submited = false;
  activationCode: string | null = '';

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.activationCode = params.get('activationCode');
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  createPassword(){
    if (this.createPasswordForm.valid) {
      const activateModel: IActivateAccountModel =
        new ActivateAccountModel(
          this.createPasswordForm.value.password!,
          this.createPasswordForm.value.confirmPassword!,
          this.activationCode!
        )
      this.accountService.activateAccount(activateModel).subscribe(
        (data) => {
          if (data.body === true) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sukces',
              detail: 'Pomyślnie dodano aktywowano konto'
            });
          } else {
            this.messageService.add({severity: 'error', summary: 'Błąd', detail: 'Coś poszło nie tak'});
          }
        }, error => {
        this.messageService.add({ severity: 'error', summary: 'Błąd', detail: error.message });
      }, () => this.router.navigate(['auth/login']));
    } else {
      this.submited = true;
    }
  }

}

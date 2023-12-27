import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthState, getAccount} from "@rtrain/shell/auth";
import {MessageService} from "primeng/api";
import {AccountService, UserService} from "@rtrain/api";
import {AccountModel, IUserProfileEditDTOModel, UserProfileEditDTOModel} from "@rtrain/domain/models";
import * as authActions from '@rtrain/shell/auth'
import {
  IResetPasswordDTOModel,
  ResetPasswordDTOModel
} from "../../../../../domain/models/accountModels/resetPasswordDTO.model";
@Component({
  selector: 'rtrain-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  account$: Observable<AccountModel | null>;

  account: AccountModel | null | undefined;
  isView = true;
  dynamicClassForInputs = 'border-b-2 focus:outline-none focus:border-primary-base pt-3 px-1 text-gray-400'
  imageURL = '';
  visible = false;
  passwordChangeModel: IResetPasswordDTOModel | undefined;
  constructor(
    private store: Store<AuthState>,
    private messages: MessageService,
    private userService: UserService,
    private accountService: AccountService
  ) {
    this.account$ = this.store.select(getAccount);


  }

  ngOnInit() {
    this.setAccountObject();
  }

  setAccountObject(){
    this.account$.subscribe((account: AccountModel | null) => {
      if (account) this.account = JSON.parse(JSON.stringify(account));
      if (this.account?.image) this.account.image = 'data:image/*;base64,' + this.account.image
    });
  }

  unlockForEdit() {
    this.isView = false;
    this.dynamicClassForInputs = 'border-b-2 focus:outline-none focus:border-primary-base pt-3 px-1'
  }

  lockAndSaveData() {
    this.isView = true;
    this.dynamicClassForInputs = 'border-b-2 focus:outline-none focus:border-primary-base pt-3 px-1 text-gray-400'
    this.saveData();
  }

  saveData(){
    const userObjectToSave = this.createUserObjectToSave();
    this.accountService.updateAccountData(userObjectToSave).subscribe({
      complete: () => {
        this.makeToast("success", "Pomyślnie zapisano", "Zmiany zostały zapisane")
      }
    });
    if (this.account && this.account.image) {
      this.account.image = this.account.image.replace(/^data:image\/[a-zA-Z*]+;base64,/, "")
    }
    if (this.account) this.store.dispatch(new authActions.UpdateAccount(this.account))
  }

  openPasswordModal(){
    this.passwordChangeModel = new ResetPasswordDTOModel()
    this.visible = true;
    // if (this.account){
    //   // this.accountService.requestPasswordReset(this.account?.userName).subscribe({
    //   //   error: (error) =>
    //   //   {
    //   //     this.makeToast('error', 'Wystąpił nieoczekiwany bład', error.message);
    //   //   },
    //   //   complete: () => {
    //   //     this.makeToast('success', 'Mail został wysłanay', 'Mail z linkiem resetującym hasło został wysłany')
    //   //   }
    //   // })
    // }
  }

  makeToast(severity: string, summary: string, detail: string) {
    this.messages.add({
      severity: severity,
      summary: summary,
      detail: detail,
      styleClass: "whitespace-pre-line",
    });
  }

  changeImage(event: any) {
    const file = event.target.files[0]
    if (file && this.account && this.account.id) {
      const formData = new FormData();
      formData.append('file', file);
      this.accountService.updateImage(formData, this.account?.id).subscribe({
        complete: () => this.makeToast('success', 'Sukces', 'Pomyślnie zmieniono zdjęcie')
      })
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.account) {
          this.account.image = e.target.result.replace(/^data:image\/[a-zA-Z*]+;base64,/, "");
          this.store.dispatch(new authActions.UpdateAccount(this.account))
        }
      };
      reader.readAsDataURL(file);
    }
  }

  createUserObjectToSave(): IUserProfileEditDTOModel | undefined{
    if(this.account){
      return new UserProfileEditDTOModel(
        this.account?.id,
        this.account?.firstName,
        this.account?.lastName,
        this.account?.phoneNumber
      )
    } else
      return undefined;
  }

  validateEmail(): boolean{
    if (this.account && this.account.email) {
      const regExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
      return regExp.test(this.account?.email);
    }
    return false;
  }

  removeImage() {
    const file = new File(['removeImage'], 'removeImage.txt');
    if (file && this.account && this.account?.id) {
      const formData = new FormData();
      formData.append('file', file);
      this.accountService.updateImage(formData, this.account.id).subscribe({
        complete: () => this.makeToast('success', 'Sukces', 'Pomyślnie usunięto zdjęcie')
      })
    }

    if (this.account) {
      this.account.image = '';
      this.store.dispatch(new authActions.UpdateAccount(this.account))
    }

  }

  submit(): void {
    if (this.account && this.account.id)
    this.accountService.changePassword(this.passwordChangeModel, this.account.id).subscribe({
      error: (error) => {
        console.log(error)
        this.makeToast('error', 'Błąd', error.error )
      },
      complete: () => {
        this.makeToast('success', 'Sukces', 'Pomyślnie zmieniono hasło')
        this.visible = false;
      }
    })
  }
}

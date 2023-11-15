import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, ToastModule],
  declarations: [LayoutComponent, NavbarComponent, FooterComponent],
  providers: [MessageService],
  exports: [LayoutComponent],
})
export class UiLayoutModule {}

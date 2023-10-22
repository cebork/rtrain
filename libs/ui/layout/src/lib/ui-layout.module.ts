import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LayoutComponent, NavbarComponent, FooterComponent],
  providers: [],
  exports: [LayoutComponent],
})
export class UiLayoutModule {}

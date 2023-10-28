import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { UiLayoutModule } from '@rtrain/ui/layout';
import { HomeComponent } from './home/home.component';
import { ShellAuthModule } from "@rtrain/shell/auth";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    UiLayoutModule,
    ShellAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

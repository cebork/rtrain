import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { UiLayoutModule } from '@rtrain/ui/layout';
import { HomeComponent } from './home/home.component';
import { ShellAuthModule } from "@rtrain/shell/auth";
import { StoreModule} from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { FeaturesAdminModule } from "@rtrain/features/admin";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {UtilModule} from "@rtrain/util";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
    UiLayoutModule,
    ShellAuthModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule,
    FeaturesAdminModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    UtilModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

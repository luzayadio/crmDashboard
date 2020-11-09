import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { HashLocationStrategy, LocationStrategy } from "@angular/common";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { HttpClientModule } from "@angular/common/http";
import { MatPaginatorIntl } from "@angular/material";
import { MatPaginatorIntlCro } from "./mat-paginator-intl-cro.module";
import { IonicStorageModule } from "@ionic/storage";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { NgxAudioPlayerModule } from "ngx-audio-player";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ChartsModule } from "ng2-charts";
import { NgChatModule } from "ng-chat";
import { RoundProgressModule } from "angular-svg-round-progressbar";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { DevExtremesModule } from "./devextremes.module";
const config: SocketIoConfig = { url: "http://localhost:3001", options: {} };

import { AngularEditorModule } from "@kolkov/angular-editor";
import {
  MatDatetimepickerModule,
  MatNativeDatetimeModule,
} from "@mat-datetimepicker/core";

/* DevExteme */

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DevExtremesModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    NgChatModule,
    IonicStorageModule.forRoot(),
    FontAwesomeModule,
    NgxAudioPlayerModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    RoundProgressModule,
    SocketIoModule.forRoot(config),
    AngularEditorModule,
    MatDatetimepickerModule,
    MatNativeDatetimeModule
  ],
  providers: [
    // Network,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: "pt-PT" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

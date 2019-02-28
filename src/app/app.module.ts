import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB2t4vJjlgmIPFeQDwr80GaWe1ag08lSKg"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

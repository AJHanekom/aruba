import { AgmCoreModule } from "@agm/core";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SelectFivePipe } from './select-five.pipe';

@NgModule({
  declarations: [AppComponent, SelectFivePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GM_Key
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

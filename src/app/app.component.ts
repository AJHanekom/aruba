import { Component } from "@angular/core";
import { CustomerService } from "./services/customer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  customerList;
  constructor(public customerService: CustomerService) {
    this.customerList = this.customerService.customerList;
  }
}

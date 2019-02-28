import { Component } from "@angular/core";
import { CustomerService } from "./services/customer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  customerList: Customer[];

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public customerService: CustomerService) {
    this.customerService.customerList.subscribe(
      list => (this.customerList = list)
    );
  }

  searchInput(event: any) {
    this.customerService.customerList.subscribe(
      list =>
        (this.customerList = list.filter(
          customer =>
            customer.Firstname.includes(event.target.value) ||
            customer.Surname.includes(event.target.value)
        ))
    );
  }
}

export interface Customer {
  Firstname: string;
  Surname: string;
  Lat: string;
  Long: string;
}

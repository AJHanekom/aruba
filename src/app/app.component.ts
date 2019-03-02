import { Component } from "@angular/core";
import { CustomerService } from "./services/customer.service";
import { point, distance, center } from "@turf/turf";
import { forEach } from "@angular/router/src/utils/collection";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  customerList: Customer[];

  lat: number = -33.9328;
  lng: number = 18.417189;
  radius: number = 10000;
  eventIcon: any;
  userIcon: any;

  constructor(public customerService: CustomerService) {
    this.eventIcon = {
      url: "../../assets/event.svg",
      scaledSize: { height: 80, width: 80 }
    };
    this.userIcon = {
      url: "../../assets/user.svg",
      scaledSize: { height: 40, width: 40 }
    };
    this.refreshList();
    this.refreshDistance();
  }

  searchInput(event: any) {
    this.refreshList();
    this.customerList = this.customerList.filter(
      customer =>
        customer.Firstname.includes(event.target.value.trim()) ||
        customer.Surname.includes(event.target.value.trim())
    );
  }

  refreshList() {
    this.customerService.customerList.subscribe(
      list => (this.customerList = list)
    );
  }

  refreshCircle(event) {
    this.lat = event.lat;
    this.lng = event.lng;
    this.refreshDistance();
  }
  updateCircleRadius(event) {
    this.radius = parseFloat(event);
    this.refreshDistance();
  }

  refreshDistance() {
    for (let customer of this.customerList) {
      customer.Distance = distance(
        point([this.lat, this.lng]),
        point([parseFloat(customer.Lat), parseFloat(customer.Long)])
      );
    }
  }
}

export interface Customer {
  Firstname: string;
  Surname: string;
  Lat: string;
  Long: string;
  Distance: number;
}

import { Component } from "@angular/core";
import { CustomerService } from "./services/customer.service";
import { point, distance, center } from "@turf/turf";
import { forEach } from "@angular/router/src/utils/collection";
import { customerList } from "./services/customerList";
import { routerNgProbeToken } from "@angular/router/src/router_module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  customerList: Customer[];
  customersWithinRange: Customer[];

  lat: number = -33.9328;
  lng: number = 18.417189;
  radius: number = 8000;
  eventIcon: any;
  userIcon: any;
  showModal = "";

  constructor(public customerService: CustomerService) {
    this.eventIcon = {
      url: "../../assets/event.svg",
      scaledSize: { height: 40, width: 40 }
    };
    this.userIcon = {
      url: "../../assets/user.svg",
      scaledSize: { height: 20, width: 20 }
    };
    this.refreshList();
    this.refreshDistance();
  }

  toggleModal(rick?) {
    if (this.showModal.length == 0) {
      this.showModal = "is-active";
    } else {
      this.showModal = "";
    }

    if (rick) {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
  }

  searchInput(event: any) {
    this.refreshList();
    this.refreshDistance();
    this.customerList = this.customerList.filter(
      customer =>
        customer.Firstname.toLowerCase().includes(
          event.target.value.toLowerCase().trim()
        ) ||
        customer.Surname.toLowerCase().includes(
          event.target.value.toLowerCase().trim()
        )
    );
    this.refreshWithinRange();
  }

  refreshList() {
    this.customerService.customerList.subscribe(
      list => (this.customerList = list)
    );
  }

  refreshWithinRange() {
    this.customersWithinRange = this.customerList.filter(
      customer => customer.Distance <= this.radius / 1000
    );
    this.customersWithinRange = this.customersWithinRange.sort(
      (a, b) => a.Distance - b.Distance
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
    this.refreshWithinRange();
  }

  setActive(customer) {
    this.customerList.map(customer => {
      customer.isActive = false;
      return customer;
    });
    customer.isActive = true;
  }
}

export interface Customer {
  Firstname: string;
  Surname: string;
  Lat: string;
  Long: string;
  Distance?: number;
  isActive?: boolean;
}

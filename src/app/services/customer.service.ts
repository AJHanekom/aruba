import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { customerList } from "./customerList";
import { createOfflineCompileUrlResolver } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  customerList: Observable<any>;

  constructor() {
    console.log("$Customer Service Started");
    this.customerList = of(customerList);
  }
}

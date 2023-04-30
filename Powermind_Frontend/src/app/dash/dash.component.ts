import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Subscription} from "rxjs";
import {DashService} from "../services/dash.service";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  subscription = new Subscription();
  userData: any = {};



  public userId: string = "";

  constructor(public authenticationService: AuthenticationService, public dashService: DashService) {}

  ngOnInit() {
    this.userId = this.authenticationService.getToken() || "0";
    this.getDashData();
  }

  public getDashData() {
    this.subscription.add(
        this.dashService.getDashData(this.userId).subscribe(res => {
          this.userData = res.user;
          this.updateUiForUser();
        })
    )
  }

  private updateUiForUser() {
    let thresholdComp : any = document.getElementById("thresholdVal") as HTMLInputElement | null
    thresholdComp.value = this.userData.threshold;
  }

  updateThreshold(thresholdVal: any) {
    this.subscription.add(this.dashService.updateThreshold(this.userId, thresholdVal).subscribe(res => {
      this.userData = res.user;
      this.updateUiForUser();
    }, error => alert(error.error)))
  }

  logout(): void {
    this.authenticationService.logout();
  }

  getChargePercentage(): number {
    return 100.0 * this.userData.battery.charge / this.userData.battery.capacity;
  }
}

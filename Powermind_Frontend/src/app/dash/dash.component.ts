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
  dashData: any = {};

  public userId: string = "";

  constructor(public authenticationService: AuthenticationService, public dashService: DashService) {}

  ngOnInit() {
    this.userId = this.authenticationService.getToken() || "0";
    this.getDashData();
  }

  public getDashData() {
    this.subscription.add(
        this.dashService.getDashData(this.userId).subscribe(res => {
          this.dashData = res.data;
        })

    )
  }
}

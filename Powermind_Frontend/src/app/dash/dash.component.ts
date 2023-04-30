import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  public userId: string = "";

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.userId = this.authenticationService.getToken() || "0";
  }
}

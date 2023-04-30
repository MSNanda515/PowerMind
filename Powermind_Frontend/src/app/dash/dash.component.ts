import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {interval, Observable, Subscription} from "rxjs";
import {DashService} from "../services/dash.service";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  subscription = new Subscription();
  userData: any = {};
  iter = 0;

  dataset1: any = []
  dataset2: any = []
  id1 = "chart1"
  id2 = "chart2"

  public userId: string = "";
  private repInterval:  any;

  constructor(public authenticationService: AuthenticationService, public dashService: DashService) {
    this.repInterval = interval(1000)
      this.repInterval.subscribe((x: any) => {
      this.recurringOperation();
    })

    this.dataset1 = [
      {
        label: "Supply",
        data: [11.5,22,31.5,40,47.5,54,59.5,64,67.5,70,71.5,72,71.5,70,67.5,64,59.5,54,47.5,40,31.5,22,11.5,11.5],
        backgroundColor: 'blue'
      },
      {
        label: "Demand",
        data: [10.0162913,9.15050352,15.1711745,26.0576019,39.9998437,55.3987179,70.8658025,85.2234355,97.5047153,106.9535,113.024408,115.382818,113.904868,108.677457,99.9982438,88.3756467,74.5288449,59.3877771,44.0931425,29.9964,18.6597689,11.8562283,11.5695177,10.0162913],
        backgroundColor: 'limegreen'
      }
    ]

    this.dataset2 = [
      {
        label: "Price UnBuffered",
        data: [1.35219932,1.23531798,2.04810855,3.51777626,5.39997891,7.48078718,12.1121625,17.5904893,23.2077774,28.1322572,31.588951,33.0200407,32.1960681,29.2601931,24.698934,19.2440028,13.7210466,8.87229621,5.95257423,4.049514,2.5190688,1.60059082,1.56188489,1.35219932],
        backgroundColor: 'blue'
      },
      {
        label: "Price Buffered",
        data: [1.45219932,1.33531798,2.14810855,3.61777626,5.49997891,3.2926441,6.75470782,11.1475976,15.8364209,20.0465726,23.0443057,24.2970997,23.5848601,21.0441773,17.1390667,12.0307123,10.1613941,8.11734991,6.05257423,4.149514,2.6190688,1.70059082,1.66188489,1.45219932],
        backgroundColor: 'limegreen'
      }
    ]
  }

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
    return 100.0 * this.userData.battery?.charge / this.userData.battery?.capacity;
  }

  recurringOperation() {
    this.iter = this.iter + 1;
    if (this.iter == 24) {
      // reset counter
      this.iter = 0;
      return;
    }
    this.dashService.getSimulationDataset(this.iter).subscribe((res: any)=> {
      let supplySeries = {
        label: "Supply",
        data: res.supply,
        backgroundColor: 'blue'
      }
      let demandSeries = {
        label: "Demand",
        data: res.demand,
        backgroundColor: 'limegreen'
      };
      this.dataset1.push(supplySeries);
      this.dataset1.push(demandSeries);
    });
  }

//  [
//           {
//             label: "Sales",
//             data: ['467','576', '572', '79', '92',
//               '574', '573', '576'],
//             backgroundColor: 'blue'
//           },
//           {
//             label: "Profit",
//             data: ['542', '542', '536', '327', '17',
//               '0.00', '538', '541'],
//             backgroundColor: 'limegreen'
//           }
//         ]
}

import {Component, Input, SimpleChanges} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public chart: any;
  @Input() datasets: any = [];

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: Array(24).fill(1).map((element, index) => index),
        datasets: [
          {
            label: "Sales",
            data: [11.5,22,31.5,40,47.5,54,59.5,64,67.5,70,71.5,72,71.5,70,67.5,64,59.5,54,47.5,40,31.5,22,11.5,11.5],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: [10.0162913,9.15050352,15.1711745,26.0576019,39.9998437,55.3987179,70.8658025,85.2234355,97.5047153,106.9535,113.024408,115.382818,113.904868,108.677457,99.9982438,88.3756467,74.5288449,59.3877771,44.0931425,29.9964,18.6597689,11.8562283,11.5695177,10.0162913],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }

  getRandomId() {
    return Math.floor((Math.random()*100)+1);
  }
}

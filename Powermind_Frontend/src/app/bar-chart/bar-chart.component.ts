import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  public chart: any;

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
            label: "Demand",
            data: [10.0162913,9.15050352,15.1711745,26.0576019,39.9998437,55.3987179,70.8658025,85.2234355,97.5047153,106.9535,113.024408,115.382818,113.904868,108.677457,99.9982438,88.3756467,74.5288449,59.3877771,44.0931425,29.9964,18.6597689,11.8562283,11.5695177,10.0162913],
            backgroundColor: 'limegreen'
          },
          {
            label: "Price UnBuffered",
            data: [1.35219932,1.23531798,2.04810855,3.51777626,5.39997891,7.48078718,12.1121625,17.5904893,23.2077774,28.1322572,31.588951,33.0200407,32.1960681,29.2601931,24.698934,19.2440028,13.7210466,8.87229621,5.95257423,4.049514,2.5190688,1.60059082,1.56188489,1.35219932],
            backgroundColor: 'red'
          },
          {
            label: "Price Buffered",
            data: [1.45219932,1.33531798,2.14810855,3.61777626,5.49997891,3.2926441,6.75470782,11.1475976,15.8364209,20.0465726,23.0443057,24.2970997,23.5848601,21.0441773,17.1390667,12.0307123,10.1613941,8.11734991,6.05257423,4.149514,2.6190688,1.70059082,1.66188489,1.45219932],
            backgroundColor: 'yellow'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}

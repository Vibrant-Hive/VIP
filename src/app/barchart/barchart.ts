import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'barchart',
  styleUrls: ['./barchart.css'],
  templateUrl: './barchart.html'
})
export class BarChartComponent {


  public barChartLegend = true;
  public barChartPlugins = [];

  public systemData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Self Learning', 'On Time Completion', 'Consistency', 'Collaboration'],
    datasets: [
      { data: [ 65, 59, 80, 81 ], label: 'System Calculated' },
    ]
  };

  public mentorData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Learning Spirit', 'Passion', 'Will Power', 'Synergy'],
    datasets: [
      { data: [ 60, 69, 90, 71 ], label: 'Mentor Remarks' , backgroundColor: ["#4682B4", "#4682B4", "#4682B4", "#4682B4"]},
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor() {
  }

}

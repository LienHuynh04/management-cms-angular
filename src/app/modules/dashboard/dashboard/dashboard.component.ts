import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

interface Chart {
  value: any,
  label: Label[],
  options: {}
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  record: any;
  chart: any;
  data: Chart[] = [];
  generalSummaryChart!: Chart;
  teamChart!: Chart;
  careChart!: Chart;
  doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  doughnutChartType: ChartType = 'doughnut';

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.record = this.activatedRoute.snapshot.data.resolvedData;

    this.generalSummaryChart = {
      value: Object.values(this.record.get_general_summary.detail),
      label: Object.keys(this.record.get_general_summary.detail),
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

    this.teamChart = {
      value: Object.values(this.record.get_statistic_for_team.detail),
      label: Object.keys(this.record.get_statistic_for_team.detail),
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }

    this.careChart = {
      value: Object.values(this.record.get_statistic_number_care.detail),
      label: Object.keys(this.record.get_statistic_number_care.detail),
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  }

  ngOnInit(): void {
  }

}

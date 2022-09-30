import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

interface Chart {
  value: any;
  label: Label[];
  type: ChartType;
  options: ChartOptions;
  color: Color[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  record: any;
  data: Chart[] = [];
  generalSummaryChart!: Chart;
  teamChart!: Chart;
  careChart!: Chart;


  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.record = this.activatedRoute.snapshot.data.resolvedData;

    this.generalSummaryChart = {
      value: Object.values(this.record.get_general_summary.detail),
      label: Object.keys(this.record.get_general_summary.detail),
      type: 'line',
      options: {
        responsive: true,
        aspectRatio: 1.5,
      },
      color: [
        {
          backgroundColor: 'rgba(78, 115, 223, 0.05)',
          borderColor: 'rgba(78, 115, 223, 1)',
          pointRadius: 3,
          pointBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointBorderColor: 'rgba(78, 115, 223, 1)',
          pointHoverRadius: 3,
          pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
          pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
          pointHitRadius: 10,
          pointBorderWidth: 2,
        }
      ]
    };

    this.teamChart = {
      value: Object.values(this.record.get_statistic_for_team.detail),
      label: Object.keys(this.record.get_statistic_for_team.detail),
      type: 'pie',
      options: {
        responsive: true,
        aspectRatio: 1.5,
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      color: []
    };

    this.careChart = {
      value: Object.values(this.record.get_statistic_number_care.detail),
      label: Object.keys(this.record.get_statistic_number_care.detail),
      type: 'doughnut',
      options: {
        responsive: true,
        aspectRatio: 1.5,
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      color: [
        {
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
          hoverBorderColor: 'rgba(234, 236, 244, 1)',
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}

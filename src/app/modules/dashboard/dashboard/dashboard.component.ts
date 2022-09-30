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
      type: 'pie',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Tổng quan',
          position: 'bottom'
        },
        aspectRatio: 1.5,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      color: []
    }

    this.teamChart = {
      value: Object.values(this.record.get_statistic_for_team.detail),
      label: Object.keys(this.record.get_statistic_for_team.detail),
      type: 'pie',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Nhóm kinh doanh',
          position: 'bottom'
        },
        aspectRatio: 1.5,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      color: []
    }

    this.careChart = {
      value: Object.values(this.record.get_statistic_number_care.detail),
      label: Object.keys(this.record.get_statistic_number_care.detail),
      type: 'line',
      options: {
        responsive: true,
        aspectRatio: 1.5,
        title: {
          display: true,
          text: 'Số lần chăm sóc',
          position: 'bottom'
        },
      },
      color: [
        {
          borderColor: '#86c7f3',
          backgroundColor: 'transparent',
        }
      ]
    }
  }

  ngOnInit(): void {
  }

}

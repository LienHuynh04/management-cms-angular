import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartInterface,
  COLOR_CHART,
  ColorChartConfig,
  OPTION_CHART,
  OptionChartConfig
} from '../../../core/interfaces';
import { DashboardEnum } from '../../../core/enums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  record: any;
  generalSummaryChart!: ChartInterface;
  teamChart!: ChartInterface;
  careChart!: ChartInterface;
  departmentChart!: ChartInterface;

  constructor(
    @Inject(OPTION_CHART)
    public optionsChart: OptionChartConfig,
    @Inject(COLOR_CHART)
    public colorChart: ColorChartConfig,
    private activatedRoute: ActivatedRoute
  ) {
    this.record = this.activatedRoute.snapshot.data.resolvedData;
    console.log(this.record);
  }

  getNamebyKeys(label: any, enumLabel: any) {
    return Object.keys(label).map((la: string) => {
      return enumLabel[la];
    });
  }

  getValues(value: any) {
    return Object.values(value);
  }

  ngOnInit(): void {
    this.drawChart();
  }

  drawChart() {
    /*Chart của Tổng quan*/
    this.generalSummaryChart = {
      value: this.getValues(this.record?.get_general_summary?.detail),
      label: this.getNamebyKeys(this.record?.get_general_summary?.detail, DashboardEnum),
      type: 'pie',
      options: {
        ...this.optionsChart.pie,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
        }
      },
      color: this.colorChart.pie
    };
    console.log(this.generalSummaryChart);
    debugger

    /*Chart của phòng kinh doanh*/
    this.teamChart = {
      value: this.getValues(this.record?.get_statistic_for_team?.detail),
      label: this.getNamebyKeys(this.record?.get_statistic_for_team?.detail, DashboardEnum),
      type: 'pie',
      options: {
        ...this.optionsChart.pie,
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      color: this.colorChart.pie
    };

    /*Chart của danh sách chăm sóc*/
    this.careChart = {
      value: this.getValues(this.record?.get_statistic_number_care?.detail),
      label: Object.keys(this.record?.get_statistic_number_care?.detail),
      type: 'line',
      options: {
        ...this.optionsChart.line,
      },
      color: this.colorChart.line
    };

    /*Chart của phòng ban*/
    this.departmentChart = {
      value: this.getValues(this.record?.get_statistic_for_department?.detail),
      label: this.getNamebyKeys(this.record?.get_statistic_for_department?.detail, DashboardEnum),
      type: 'pie',
      options: {
        ...this.optionsChart.line,
        legend: {
          display: true,
          position: 'bottom'
        }
      },
      color: this.colorChart.pie
    };
  }
}

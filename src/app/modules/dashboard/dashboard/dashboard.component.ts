import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartInterface, COLOR_CHART, ColorChartConfig, OPTION_CHART, OptionChartConfig } from '../../../core/interfaces';
import { DashboardEnum } from '../../../core/enums';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPermissionsService } from 'ngx-permissions';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('summaryBaseChart') summaryBaseChart!: BaseChartDirective | any;
  @ViewChild('careBaseChart') careBaseChart!: BaseChartDirective | any;
  @ViewChild('teamBaseChart') teamBaseChart!: BaseChartDirective | any;
  @ViewChild('departmentBaseChart') departmentBaseChart!: BaseChartDirective | any;
  record: any;
  generalSummaryChart!: ChartInterface;
  teamChart!: ChartInterface;
  careChart!: ChartInterface;
  departmentChart!: ChartInterface;
  selectStaticAdmin: any = {};
  isRoleAdmin = false;
  selectTeamControl = new FormControl();
  selectDepartmentControl = new FormControl();

  constructor(
    @Inject(OPTION_CHART)
    public optionsChart: OptionChartConfig,
    @Inject(COLOR_CHART)
    public colorChart: ColorChartConfig,
    private activatedRoute: ActivatedRoute,
    private permissionService: NgxPermissionsService,
    private dashboardService: DashboardService
  ) {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.record = resolvedData.data;
    this.selectStaticAdmin = resolvedData?.selectStaticAdmin;

  }

  setupStaticAdmin() {
    this.isRoleAdmin = !!this.permissionService.getPermission('admin');
    if (this.isRoleAdmin) {
      this.selectTeamControl.patchValue(this.selectStaticAdmin['team'][0].id);
      this.selectDepartmentControl.patchValue(this.selectStaticAdmin['department'][0].id);
      this.getDepartmentAdmin();
      this.getTeamAdmin();
    }
  }

  getDepartmentAdmin() {
    this.dashboardService.getStaticDepartmentAdmin(this.selectDepartmentControl.value).subscribe(resp => {
      this.record.get_statistic_for_team = resp;
    });
  }

  getTeamAdmin() {
    this.dashboardService.getStaticTeamAdmin(this.selectTeamControl.value).subscribe(resp => {
      this.record.get_statistic_for_department = resp;
    });
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
    if(this.record?.get_general_summary) {
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
    }

    /*Chart của phòng kinh doanh*/
    if(this.record?.get_statistic_for_team) {
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
    }

    /*Chart của danh sách chăm sóc*/
    if(this.record?.get_statistic_number_care) {
      this.careChart = {
        value: this.getValues(this.record?.get_statistic_number_care?.detail),
        label: Object.keys(this.record?.get_statistic_number_care?.detail),
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
    }

    /*Chart của phòng ban*/
    if(this.record?.get_statistic_for_department) {
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
    this.setupStaticAdmin();
  }

  isCheckZeroChart(item: any) {
    return !!Object.values(item).filter((i: any) => i > 0).length;
  }

  legendOnClick(legendItem: any) {
    let index = legendItem.datasetIndex;
    alert(legendItem);
  }

  ngAfterViewInit(): void {
    this.selectTeamControl.valueChanges.subscribe(value => {
      this.getTeamAdmin();
    });
    this.selectDepartmentControl.valueChanges.subscribe(value => {
      this.getDepartmentAdmin();
    });
  }
}

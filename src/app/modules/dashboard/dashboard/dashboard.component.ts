import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChartInterface,
  COLOR_CHART,
  ColorChartConfig, ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface,
  OPTION_CHART,
  OptionChartConfig
} from '../../../core/interfaces';
import { BaseChartDirective } from 'ng2-charts';
import { NgxPermissionsService } from 'ngx-permissions';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../../../core/services/dashboard.service';
import { drawChart } from './draw-chart';
import { ResultEnum } from '../../../core/enums';
import { CustomerService } from '../../../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  isModalCustomer = false;
  customerList: CustomerInterface[] = [];
  colsCustomer: ColumnInterface[] = this.colums.customer;
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
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    @Inject(OPTION_CHART)
    public optionsChart: OptionChartConfig,
    @Inject(COLOR_CHART)
    public colorChart: ColorChartConfig,
    private activatedRoute: ActivatedRoute,
    private permissionService: NgxPermissionsService,
    private dashboardService: DashboardService,
    public customerService: CustomerService,
    public router: Router
  ) {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;
    this.record = resolvedData.data;
    this.selectStaticAdmin = resolvedData?.selectStaticAdmin;

  }

  setupStatic() {
    this.isRoleAdmin = !!this.permissionService.getPermission('admin');
    if (this.isRoleAdmin) {
      this.selectTeamControl.patchValue(this.selectStaticAdmin['team'][0].id);
      this.selectDepartmentControl.patchValue(this.selectStaticAdmin['department'][0].id);
      this.getDepartmentAdmin();
      this.getTeamAdmin();
      this.drawChartGeneralSummary();
      this.drawChartCare();
    } else {
      this.drawChartGeneralSummary();
      this.drawChartTeam();
      this.drawChartCare();
      this.drawChartDepartment();
    }
  }

  getDepartmentAdmin() {
    this.dashboardService.getStaticDepartmentAdmin(this.selectDepartmentControl.value).subscribe(resp => {
      this.record.get_statistic_for_department = resp;
      this.drawChartDepartment();
    });
  }

  getTeamAdmin() {
    this.dashboardService.getStaticTeamAdmin(this.selectTeamControl.value).subscribe(resp => {
      this.record.get_statistic_for_team = resp;
      this.drawChartTeam();
    });
  }

  ngOnInit(): void {
    this.setupStatic();
  }

  drawChartGeneralSummary() {
    /*Chart của Tổng quan*/
    if (this.record?.get_general_summary) {
      const options = {
        ...this.optionsChart.pie,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
        },
        onClick: (event: any, item: any) => {
        // , item[0]._model.label,'filter[result]'
          this.getDataCustomer('general', item[0]._model.label);
        },
      };

      this.generalSummaryChart = drawChart(
        this.record?.get_general_summary,
        options,
        this.colorChart.pie,
        'pie',
        true
      );
    }
  }

  drawChartTeam() {
    /*Chart của phòng kinh doanh*/
    if (this.record?.get_statistic_for_team) {
      const options = {
        ...this.optionsChart.pie,
        legend: {
          display: true,
          position: 'bottom'
        },
        onClick: (event: any, item: any) => {
          this.getDataCustomer('statistic_for_team', item[0]._model.label);
        }
      };

      this.teamChart = drawChart(
        this.record?.get_statistic_for_team,
        options,
        this.colorChart.pie,
        'pie',
        true
      );
    }
  }

  drawChartCare() {
    /*Chart của danh sách chăm sóc*/
    if (this.record?.get_statistic_number_care) {
      const options = {
        ...this.optionsChart.pie,
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
          }
        },
        onClick: (event: any, item: any) => {
          this.getDataCustomer('statistic_number_care', item[0]._model.label);
        },
      };

      this.careChart = drawChart(
        this.record?.get_statistic_number_care,
        options,
        this.colorChart.pie,
        'pie'
      );
    }
  }

  drawChartDepartment() {
    /*Chart của phòng ban*/
    if (this.record?.get_statistic_for_department) {
      const options = {
        ...this.optionsChart.line,
        legend: {
          display: true,
          position: 'bottom'
        },
        onClick: (event: any, item: any) => {
          this.getDataCustomer('statistic_for_department', item[0]._model.label);
        },
      };

      this.departmentChart = drawChart(
        this.record?.get_statistic_for_department,
        options,
        this.colorChart.pie,
        'pie',
        true
      );
    }
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


  getDataCustomer(nameChart = '', label = '') {
    const resultEnum: any = ResultEnum
    const value = Object.keys(resultEnum).find(k => resultEnum[k] === label);
    console.log('label', label);
    console.log(value);
    let  param: any;
    switch (nameChart) {
      case 'general' : {
        param = {
          'filter[result]': value
        }
        break;
      }
      case 'statistic_for_team': {
        param = {
          'filter[result]': value,
          'filter[team_id]': this.selectTeamControl.value
        }
        break
      }
      case 'statistic_number_care' :{
        param = {
          'filter[number_of_times_care]': label,
        }
        break
      }
      case 'statistic_for_department' :{
        this.router.navigate(['customers'])
        break
      }
    }

    this.customerService.getAll({
      page: 0,
      per_page: 0,
      ...param
    }).subscribe((res) => {
      this.isModalCustomer = true;
      this.customerList = res.data;
      console.log(this.customerList);
    })
  }
  handleCancel() {
    this.customerList = [];
    this.isModalCustomer = false;
  }
}

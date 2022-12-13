import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface, StaffInterface } from '../../../core/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService, CustomerService } from '../../../core/services';
import { BaseTable } from '../../../shared/abstracts';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ResultEnum } from '../../../core/enums';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<CustomerInterface> implements OnInit, AfterViewInit {
  isVisibleAssign = false;
  cols: ColumnInterface[] = this.colums.customer;
  staff: StaffInterface[] = [];
  staffControl = new FormControl('');
  customer !: CustomerInterface;
  keys = Object.keys;
  resultSelect = ResultEnum
  resultControl = new FormControl('')
  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public modalService: NzModalService,
    public notification: NzNotificationService,
    public authService: AuthenticationService,
    public router: Router
  ) {
    super(activatedRoute, modalService, notification, authService);
    this.resultControl.patchValue(this.activatedRoute.snapshot.queryParams.filter || '');
    this.activatedRoute.queryParams.subscribe((params) => {
      if (!Object.keys(params).length) {
        this.resultControl.patchValue('');
      }
    });
  }

  ngOnInit(): void {
    this.initFormFilter();
    this.staff = this.resolvedData?.staff;
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      search: [null]
    });
    return this.filterForm;
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.customerService.getAll({
      ...super.processFilter(),
     'filter[result]': this.resultControl.value
    });
    this.processData(request);
    history.pushState({}, '', location.href.split('?')[0]);
  }

  openModalAssign(customer: CustomerInterface) {
    this.isVisibleAssign = true;
    this.customer = {...customer};
    this.staffControl.patchValue(customer?.assign_for_user.id);
  }

  assignStaff() {
    if (this.staffControl.dirty) {
      this.modalService.confirm({
        nzTitle: 'Bạn có muốn thay đổi ?',
        nzOkText: 'Có',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzCancelText: 'Không',
        nzOnOk: () => {
          this.customerService.update(this.customer.id, {
            assign_for_user_id: this.staffControl.value
          }).subscribe(({data}) => {
            this.isVisibleAssign = false;
            const index = this.records.findIndex(d => d.id == this.customer.id);
            this.records[index] = data
          });
        }
      });
    } else {
      this.isVisibleAssign = false;
    }
  }

  confirm(id: number | string | undefined) {
    this.customerService.delete(id).subscribe(() => {
      this.processData(this.customerService.getAll({
        ...super.processFilter(),
        'filter[result]': this.resultControl.value
      }));
      super.confirm();
    });
  }

  ngAfterViewInit(): void {
   this.resultControl.valueChanges.subscribe(_ => {
     this.fetchData();
   })
  }
}

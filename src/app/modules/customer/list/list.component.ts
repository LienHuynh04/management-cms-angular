import { Component, Inject, OnInit } from '@angular/core';
import { ColumnConfig, ColumnInterface, COLUMNS, CustomerInterface, UserInterface } from '../../../core/interfaces';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../../core/services';
import { BaseTable } from '../../../shared/abstracts';
import { CareTableComponent } from '../care-table/care-table.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTable<CustomerInterface> implements OnInit {
  isVisibleAssign = false;
  cols: ColumnInterface[] = this.colums.customer;
  staff: UserInterface[] = [];
  staffControl = new FormControl('');
  customer !: CustomerInterface;

  constructor(
    @Inject(COLUMNS)
    public colums: ColumnConfig,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private customerService: CustomerService,
    public modalService: NzModalService,
    public notification: NzNotificationService,
  ) {
    super(activatedRoute, modalService, notification);
  }

  ngOnInit(): void {
    this.initFormFilter();
    this.staff = this.resolvedData.staff;
  }

  initFormFilter(): FormGroup {
    this.filterForm = this.fb.group({
      full_name: [null],
      phone_number: [null],
      address: [null],
      email: [null]
    });
    return this.filterForm;
  }

  /**
   * Call api to get list
   */
  fetchData(): void {
    const request = this.customerService.getAll(super.processFilter());
    this.processData(request);
  }

  openModalCare(care: any) {
    this.modalService.create({
      nzTitle: 'Thông tin nhân viên chăm sóc',
      nzContent: CareTableComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '70vw',
      nzStyle: {
        top: '30%'
      },
      nzComponentParams: {
        care: care
      }
    });
  }

  openModalAssign(customer: CustomerInterface) {
    this.isVisibleAssign = true;
    this.customer = {...customer};
    this.staffControl.setValue(customer.assign_for_user.id);
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
          }).subscribe((_) => {
            this.isVisibleAssign = false;
          });
        }
      });
    } else {
      this.isVisibleAssign = false;
    }
  }
}

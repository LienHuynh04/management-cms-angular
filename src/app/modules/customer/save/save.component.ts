import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, CustomerService, LoadingOverlayService } from '../../../core/services';
import { CustomerInterface, ProjectInterface, StaffInterface } from '../../../core/interfaces';
import { BaseForm } from '../../../shared/abstracts';
import { ResultEnum } from '../../../core/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CustomerInterface> implements OnInit {
  projects!: ProjectInterface[];
  users !: StaffInterface[];
  resultEnum: any = ResultEnum;
  optionResultField = Object.keys(this.resultEnum).filter(r => r);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public notification: NzNotificationService,
    public authService: AuthenticationService,
    private permissionService: NgxPermissionsService
  ) {
    super(modalService, loadingOverlayService, notification, activatedRoute, router);
    this.projects = this.resolvedData.projects;
    this.users = this.resolvedData.users;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.saveForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assign_for_user_id: [
        ['admin', 'marketing'].includes(this.authService.currentUserValue.role[0].name)
          ? ''
          : this.authService.currentUserValue.id
        ,
        [Validators.required]],
      project_note: [null],
      note: [null],
      result: [null],
      customer_project: []
    });

    const isRole = ['sales', 'agency', 'cooperator'].includes(this.authService.currentUserValue.role[0].name)

    if(isRole) {
      this.field('assign_for_user_id').patchValue(this.users[0].id as any)
    }

    if (this.record) {
      this.record.assign_for_user_id = this.record.assign_for_user?.id;
      this.record.customer_project = this.record.customer_project.map((p: any) => {
        return p?.name;
      });
    }

    super.patchValueForm();
  }

  submitForm(): void {
    this.processData(this.record
        ? this.customerService.update(this.record.id, this.removeValueNull(this.saveForm.value))
        : this.customerService.create(this.removeValueNull(this.saveForm.value)),
      'customers'
    );
  }
}

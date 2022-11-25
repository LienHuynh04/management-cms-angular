import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, CustomerService, LoadingOverlayService } from '../../../core/services';
import { CustomerInterface, ProjectInterface, StaffInterface } from '../../../core/interfaces';
import { BaseForm } from '../../../shared/abstracts';
import { ResultEnum } from '../../../core/enums';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { format } from 'date-fns';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CustomerInterface> implements OnInit {
  radioProject = false;
  projects!: ProjectInterface[];
  projects_new!: ProjectInterface[];
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
    public authService: AuthenticationService
  ) {
    super(modalService, loadingOverlayService, notification, activatedRoute, router);
    this.projects = this.resolvedData.projects;
    this.projects_new = this.resolvedData?.projects_new;
    this.users = this.resolvedData.users;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.saveForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: ['',[Validators.required, Validators.pattern('^\\d+$')]],
      address: ['', Validators.required],
      email: ['', [Validators.email]],
      assign_for_user_id: [
        ['admin', 'sales-manager'].includes(this.authService.currentUserValue.role[0].name)
          ? ''
          : this.authService.currentUserValue.id
        ,
        [Validators.required]],
      project_note: [null],
      note: [null],
      result: [null],
      customer_project: [],
      created_day: [new Date(), [Validators.required]],
    });

    const isRole = ['sales'].includes(this.authService.currentUserValue.role[0].name);

    if (isRole) {
      this.field('assign_for_user_id').patchValue(this.users[0].id as any);
    }

    if (this.record) {
      this.record.assign_for_user_id = this.record.assign_for_user?.id;
      this.record.customer_project = this.record.customer_project?.name;
      this.radioProject = !!Number(this.record.type_project);
    }

    super.patchValueForm();
  }

  submitForm(): void {
    const body = this.saveForm.value;

    /* Convert Date*/
    body.created_day = format(new Date(body.created_day), "yyyy-MM-dd");
    this.processData(this.record
        ? this.customerService.update(this.record.id, this.removeValueNull(body))
        : this.customerService.create(this.removeValueNull(body)),
      'customers'
    );
  }

  changeRadioProject() {
    this.field('customer_project').reset()
  }
}

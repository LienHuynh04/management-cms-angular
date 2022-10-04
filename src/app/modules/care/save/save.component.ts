import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseForm } from '../../../shared/abstracts';
import { AuthenticationService, CareService, LoadingOverlayService } from '../../../core/services';
import { CareInterface, CustomerInterface, ProjectInterface, StaffInterface } from '../../../core/interfaces';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CareInterface> implements OnInit {
  project: ProjectInterface[] = [];
  customer !: CustomerInterface;
  user!: StaffInterface[];
  care!: CareInterface[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerCareService: CareService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public notification: NzNotificationService,
    public authService: AuthenticationService
  ) {
    super(modalService, loadingOverlayService, notification, activatedRoute, router);
    this.customer = this.resolvedData?.customer;
    this.user = this.resolvedData?.user;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.saveForm = this.fb.group({
      staff_id: [this.authService.currentUserValue.id],
      description: [this.record?.description, Validators.required],
    });
  }

  submitForm(): void {
    this.processData(
      this.record
        ? this.customerCareService.update(+this.customer.id, this.record.id, this.saveForm.value)
        : this.customerCareService.create(+this.customer.id, this.saveForm.value),
      `care/${this.customer.id}`
    );
  }
}

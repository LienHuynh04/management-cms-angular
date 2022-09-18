import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseForm} from '../../../shared/abstracts';
import {CustomerCareService} from '../../../core/services';
import {CustomerCareInterface, CustomerInterface, ProjectInterface, UserInterface} from '../../../core/interfaces';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CustomerCareInterface> implements OnInit {
  project: ProjectInterface[] = [];
  customer !: CustomerInterface[];
  user!: UserInterface[];
  care!: CustomerCareInterface[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerCareService: CustomerCareService,
    private activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute, router);
    this.customer = this.resolvedData?.customer;
    this.user = this.resolvedData?.user;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      customer_id: [this.record ? this.record.customer.id : '', Validators.required],
      staff_id: [this.record ? this.record.staff.id : '', [Validators.required]],
      description: [this.record?.description, Validators.required],
    });
  }

  submitForm(): void {
    this.processData(
      this.record
        ? this.customerCareService.update(this.record.id, this.saveForm.value)
        : this.customerCareService.create(this.saveForm.value),
      'customer-care'
    );
  }
}

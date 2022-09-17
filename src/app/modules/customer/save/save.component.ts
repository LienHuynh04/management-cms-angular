import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../core/services';
import {CustomerInterface} from '../../../core/interfaces';
import {BaseForm} from '../../../shared/abstracts';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CustomerInterface> implements OnInit {
  customerProject = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute, router);
    this.customerProject = this.resolvedData.customerProject;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      customer_project: [[]]
    });

    super.patchValueForm();
  }

  submitForm(): void {
    this.processData(this.record
        ? this.customerService.update(this.record.id, this.saveForm.value)
        : this.customerService.create(this.saveForm.value),
      'customers'
    );
  }
}

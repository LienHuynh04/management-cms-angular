import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../core/services';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  customerData: any
  customerForm!: FormGroup;
  customerProject = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;

    this.customerProject = resolvedData.customerProject;
    this.customerData = resolvedData.data;
    console.log(this.customerData);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.customerForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      customer_project: [[]]
    });

    if(this.customerData) {
      this.customerForm.patchValue(this.customerData)
    }
  }

  submitForm(): void {
    for (const i in this.customerForm.controls) {
      this.customerForm.controls[i].markAsDirty();
      this.customerForm.controls[i].updateValueAndValidity();
    }

    if (this.customerForm.invalid) {
      return;
    }

    if(this.customerData) {
      this.customerService.update(this.customerData.id, this.customerForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      })
    }else {
      this.customerService.createCustomer(this.customerForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      })
    }
  }
}

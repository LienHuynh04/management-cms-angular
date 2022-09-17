import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseForm} from '../../../shared/abstracts';
import {ConfirmedValidator} from '../../../shared';
import {CustomerCareService} from '../../../core/services';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm implements OnInit {
  customerProject = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerCareService: CustomerCareService,
    private activatedRoute: ActivatedRoute
  ) {
    super(activatedRoute, router);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      login_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
  }

  submitForm(): void {
    for (const i in this.saveForm.controls) {
      this.saveForm.controls[i].markAsDirty();
      this.saveForm.controls[i].updateValueAndValidity();
    }

    if (this.saveForm.invalid) {
      return;
    }

    if (this.record) {
      this.customerCareService.update(this.record.id, this.saveForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      });
    } else {
      this.customerCareService.create(this.saveForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      });
    }
  }
}

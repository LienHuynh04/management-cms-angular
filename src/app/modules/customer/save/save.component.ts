import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../../core/services';
import {CustomerInterface, ProjectInterface, UserInterface} from '../../../core/interfaces';
import {BaseForm} from '../../../shared/abstracts';
import {ResultEnum} from '../../../core/enums';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<CustomerInterface> implements OnInit {
  projects!: ProjectInterface[];
  users !: UserInterface[];
  resultEnum : any = ResultEnum
  optionResultField = Object.keys(this.resultEnum).filter(r => r)

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService
  ) {
    super(modalService, activatedRoute, router);
    this.projects = this.resolvedData.projects;
    this.users = this.resolvedData.users;
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
      assign_for_user_id: [null],
      project_note: [null],
      note: [null],
      result: [null],
      customer_project: []
    });
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
        ? this.customerService.update(this.record.id, this.saveForm.value)
        : this.customerService.create(this.saveForm.value),
      'customers'
    );
  }
}

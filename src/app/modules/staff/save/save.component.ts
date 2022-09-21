import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/services';
import {BaseForm} from '../../../shared/abstracts';
import {ConfirmedValidator} from '../../../shared';
import {IRole, UserInterface} from '../../../core/interfaces';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NameRoleEnum, RoleEnum} from '../../../core/enums';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<UserInterface> implements OnInit {
  roles: IRole[] = [];
  passwordVisible = false;
  passwordVisibleConfirm = false;
  roleEnum = RoleEnum;
  nameRoleEnum = NameRoleEnum;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService
  ) {
    super(modalService, activatedRoute, router);
    this.roles = this.resolvedData.roles;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      login_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null],
      role_id: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
    super.patchValueForm();

    if(this.record) {
      this.field('role_id').disable()
      this.field('login_id').disable()
      this.field('password').setValidators([Validators.minLength(8)])
    }
  }

  submitForm(): void {
    const body  = {...this.saveForm.value}
    if(!body.password) {
      delete body.password;
      delete body.password_confirmation
    }
    this.processData(
      this.record
        ? this.userService.update(this.record.id, body)
        : this.userService.create(this.saveForm.value),
      'staff'
    );
  }
}

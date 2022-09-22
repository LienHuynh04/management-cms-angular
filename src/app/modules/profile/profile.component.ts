import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService, LoadingOverlayService, StaffService} from '../../core/services';
import {ConfirmedValidator} from '../../shared';
import {IAdmin} from '../../core/interfaces';
import {BaseForm} from '../../shared/abstracts';
import {switchMap} from 'rxjs/operators';
import {NzModalService} from 'ng-zorro-antd/modal';
import {RoleEnum} from '../../core/enums';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseForm<IAdmin> implements OnInit {
  passwordVisible = false;
  passwordVisibleConfirm = false;

  roleEnum = RoleEnum;

  constructor(
    private fb: FormBuilder,
    public authService: AuthenticationService,
    public staffService: StaffService,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public router: Router,
    public notification: NzNotificationService
  ) {
    super(modalService, loadingOverlayService, notification);
  }

  ngOnInit(): void {
    this.record = this.authService.currentUserValue;
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      password: [null, [Validators.minLength(8)]],
      password_confirmation: [null],
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
    super.patchValueForm();
  }

  submitForm() {
    const body  = {...this.saveForm.value}
    if(!body.password) {
      delete body.password;
      delete body.password_confirmation
    }

    this.staffService.updateProfile(body)
      .pipe(
        switchMap(() => this.authService.profile())
      )
      .subscribe( _ => {
        super.patchValueForm();
        this.router.navigate(['dashboard'])
      });
  }
}

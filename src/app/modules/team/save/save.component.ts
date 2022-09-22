import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingOverlayService, TeamService} from '../../../core/services';
import {BaseForm} from '../../../shared/abstracts';
import {UserInterface} from '../../../core/interfaces';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzNotificationService} from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<UserInterface> implements OnInit {
  users: UserInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public notification: NzNotificationService,
  ) {
    super(modalService, loadingOverlayService, notification, activatedRoute, router);
    this.users = this.resolvedData.users;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      leader: ['', Validators.required],
    });
    super.patchValueForm();
  }

  submitForm(): void {
    this.processData(
      this.record
        ? this.teamService.update(this.record.id, this.saveForm.value)
        : this.teamService.create(this.saveForm.value),
      'teams'
    );
  }
}

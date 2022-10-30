import { Component, OnInit } from '@angular/core';
import { BaseForm } from '../../../shared/abstracts';
import { ProjectInterface } from '../../../core/interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingOverlayService, ProjectService, StaffService } from '../../../core/services';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfirmedValidator } from '../../../shared';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<ProjectInterface> implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    public modalService: NzModalService,
    public loadingOverlayService: LoadingOverlayService,
    public notification: NzNotificationService
  ) {
    super(modalService, loadingOverlayService, notification, activatedRoute, router);
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      name: ['', Validators.required],
      type: ['SOIL', [Validators.required]],
      price: ['', Validators.required],
      local: ['', [Validators.required]]
    });
    super.patchValueForm();
  }

  submitForm(): void {
    const body = {...this.saveForm.value};

    this.processData(
      this.record
        ? this.projectService.update(this.record.id, body)
        : this.projectService.create(this.saveForm.value),
      'project-new'
    );
  }
}


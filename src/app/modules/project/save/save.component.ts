import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ProjectService} from '../../../core/services';
import {map} from 'rxjs/operators';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {BaseForm} from '../../../shared/abstracts';
import {Observable} from 'rxjs';
import {ProjectInterface} from '../../../core/interfaces';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent extends BaseForm<ProjectInterface> implements OnInit {
  @Input() id !: number | string | undefined;
  project !: ProjectInterface[];

  constructor(
    private projectService: ProjectService,
    private modal: NzModalRef,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.saveForm = this.fb.group({
      name: ['', Validators.required]
    });
    if (this.id) {
      this.fetchData().subscribe(resp => {
        this.saveForm.patchValue(resp);
      });
    }
  }

  submitForm(): void {
    let source$: Observable<any> = this.id
      ? this.projectService.update(this.id, this.saveForm.value)
      : this.projectService.create(this.saveForm.value);
    source$.subscribe(_ => {
      this.closeModal();
    });
  }

  closeModal() {
    this.saveForm.reset();
    this.modal.destroy();
  }

  fetchData() {
    return this.projectService.getById(this.id).pipe(
      map((resp) => {
        return resp.data;
      })
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  userData: any;
  userForm!: FormGroup;
  customerProject = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    const resolvedData = this.activatedRoute.snapshot.data.resolvedData;

    this.userData = resolvedData.data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      login_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  submitForm(): void {
    for (const i in this.userForm.controls) {
      this.userForm.controls[i].markAsDirty();
      this.userForm.controls[i].updateValueAndValidity();
    }

    if (this.userForm.invalid) {
      return;
    }

    if (this.userData) {
      this.userService.update(this.userData.id, this.userForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['', '/']);
      });
    }
  }
}

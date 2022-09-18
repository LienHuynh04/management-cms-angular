import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    }
   this.doLogin()
  }

  doLogin(): void {
    const data = this.validateForm.value
    this.authService.login(data.userName, data.password)
    .subscribe();
  }
}

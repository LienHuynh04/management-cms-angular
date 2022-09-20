import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService, LoadingOverlayService} from '../../core/services';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  passwordVisible = false;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    public loadingOverlayService: LoadingOverlayService
    ) {}

  ngOnInit(): void {
    this.loadingOverlayService.isLoading$
      .pipe(delay(0))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });

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
    const data = this.validateForm.value;
    this.authService.login(data.userName, data.password)
    .subscribe();
  }
}

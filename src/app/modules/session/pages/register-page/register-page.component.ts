import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { RegistrationStep } from '@core/models/session';
import { DialogService } from '@core/services';
import { passwordFormatValidator } from '@core/validators/password-format-validator.directive';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  errorMessage: string;
  verifyForm: FormGroup;
  otpForm: FormGroup;
  registerForm: FormGroup;
  registrationStep: RegistrationStep = RegistrationStep.verify;
  RegistrationStep = RegistrationStep;
  registrationProcessLoading: boolean = false;
  successMessage: string;

  // convenience getter for form controls
  get fv(): { [key: string]: AbstractControl } {
    return this.verifyForm.controls;
  }

  // convenience getter for form controls
  get fo(): { [key: string]: AbstractControl } {
    return this.otpForm.controls;
  }

  // convenience getter for form controls
  get fr(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.verifyForm = new FormGroup({
      memberMlsId: new FormControl('', Validators.required),
    });
    this.otpForm = new FormGroup({
      otp: new FormControl('', Validators.required),
    });
    this.registerForm = new FormGroup({
      memberMlsId: new FormControl(''),
      phoneNumber: new FormControl(''),
      email: new FormControl(''),
      // alternateEmail: new FormControl('',),
      fullname: new FormControl(''),
      password: new FormControl('', [Validators.required, passwordFormatValidator()]),
      photo: new FormControl(''),
      receivedNotif: new FormControl(false),
    });
  }

  ngOnInit(): void {
  }

  onBackToVerify() {
    this.errorMessage = null;
    this.successMessage = null;
    this.registrationStep = RegistrationStep.verify;
  }

  onVerify() {
    this.registrationProcessLoading = true;
    this.errorMessage = null;
    const formValues = this.verifyForm.value;
    this.authService.verifyMember(formValues).subscribe(
      (res) => {
        this.successMessage =  res.message;
        this.registrationProcessLoading = false;
        this.registrationStep = RegistrationStep.otp;
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        this.registrationProcessLoading = false;
        this.errorMessage = err.message;
      }
    );
  }

  onOtp() {
    this.registrationProcessLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    const formValues = this.otpForm.value;
    this.authService.verifyOtp(formValues.otp).subscribe(
      (res) => {
        this.registerForm.controls['memberMlsId'].setValue(res.data.memberMlsId);
        this.registerForm.controls['phoneNumber'].setValue(res.data.phoneNumber);
        this.registerForm.controls['email'].setValue(res.data.email);
        this.registerForm.controls['fullname'].setValue(res.data.fullName);
        this.registerForm.controls['photo'].setValue(res.data.photo);
        this.registrationStep = RegistrationStep.register;
        this.registrationProcessLoading = false;
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        this.registrationProcessLoading = false;
        this.errorMessage = err.message;
      }
    );
  }

  onRegister() {
    this.registrationProcessLoading = true;
    this.successMessage = null;
    this.errorMessage = null;
    const formValues = this.registerForm.value;
    this.authService.register(formValues).subscribe(
      (res) => {
        setTimeout(() => {
          this.dialogService.openInfoDialog({
            header:'Registration Completed',
            message: 'Registration is successful and you can now login',
            onAccept: () => {
              this.router.navigate(['']);
            },
          });
        }, 200);
        this.registrationProcessLoading = false;
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
        this.registrationProcessLoading = false;
        this.errorMessage = err.message;
      }
    );
  }

  onCancel() {
    this.router.navigate(['']);
  }

}

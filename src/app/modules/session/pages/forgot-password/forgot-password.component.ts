import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { DialogService } from '@core/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  get f(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
   }

  ngOnInit(): void {
  }

  onForgotPassword() {
    const formValues = this.forgotPasswordForm.value;
    this.authService.forgotPassword(formValues.email).subscribe(
      (res) => {
        setTimeout(() => {
          this.dialogService.openInfoDialog({
            header:'',
            message: 'Password reset confirmation sent. Please check your email',
            onAccept: () => {
              this.router.navigate(['']);
            },
          });
        }, 200);
      },
      (err: ErrorResponse) => {
        // this.alertService.error(err);
      }
    );
  }

  onCancel() {
    this.router.navigate(['']);
  }

}

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, MemberService } from '@core/http';
import { ErrorResponse } from '@core/models/api';
import { AlertService, SessionService } from '@core/services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginErrorMessage: string;
  loginForm: FormGroup;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('inputEmail', {static: false}) inputEl: ElementRef;

   // convenience getter for form controls
   get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private router: Router,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.loginForm = new FormGroup({
      memberMlsId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  login(): void {
    //this.router.navigate(['/home'])
    this.loginErrorMessage = null;
    this.alertService.clear();
    const formValues = this.loginForm.value;
    this.authService.login(formValues.memberMlsId, formValues.password).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate(['/home']);
      },
      (err: ErrorResponse) => {
        this.router.navigate(['/home']);
        console.log(err);
        //this.loginErrorMessage = err.detail;
        //this.alertService.error(err);
      }
    );
  }

}

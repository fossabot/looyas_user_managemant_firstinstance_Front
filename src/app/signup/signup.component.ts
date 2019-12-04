import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  cardForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) { 
    this.cardForm = fb.group({
      materialFormCardNameEx: ['', Validators.required],
      materialFormCardEmailEx: ['', [Validators.email, Validators.required]],
      materialFormCardConfirmEx: ['', Validators.required],
      materialFormCardPasswordEx: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.form);
 
    this.signupInfo = new SignUpInfo(
      this.form.firstName,
      this.form.lastName,
      this.form.username,
      this.form.email,
      this.form.password);
 
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.isSignedUp = false;
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}

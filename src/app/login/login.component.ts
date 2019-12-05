import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router) {
   
   }
 
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }
 
  onSubmit() {
    console.log(this.form);
 
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);
 
    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
 
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        console.log("success login");
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }
 

























  
  reloadPage() {
    window.location.reload();
  }
}
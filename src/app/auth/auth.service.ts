import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{JwtResponse} from './jwt-response'
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
providedIn: 'root'
})
export class AuthService {
private loginUrl = 'http://localhost:8008/auth/signin';
private signupUrl = 'http://localhost:8008/auth/signup';

constructor(private http: HttpClient) {
  }
  // JwtResponse(accessToken,type,username,authorities)

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  // SignUpInfo(name,username,email,role,password)

  signUp(info: SignUpInfo): Observable<string> {
     return this.http.post(this.signupUrl,info,{responseType: 'text'} );
  }
}

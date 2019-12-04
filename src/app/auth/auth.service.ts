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
private loginUrl = 'http://192.168.10.193:8888/auth/signin';
private signupUrl = 'http://192.168.10.193:8888/auth/signup';

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

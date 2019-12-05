import { Injectable } from '@angular/core';
 
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  private authority: string;

  constructor() { }
 
  signOut() {
    window.sessionStorage.clear();
  }
 
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
 
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
 
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
 
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
 


  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }
 
  public getAuthorities(): string[] {
    this.roles = [];
 
    if (sessionStorage.getItem(TOKEN_KEY)) {
      console.log(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)));
       JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(element => {
        this.roles.push(element.name)
      });
      console.log(this.roles);
      return this.roles;
    }
 
    return this.roles;
  }

  getAuthority(): string {
    if (this.getToken()) {
      this.roles = this.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    return this.authority;
  }
}
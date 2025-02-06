import { Directive, ElementRef, Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root', // Makes this guard available throughout the app
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private loginService:LoginService) {}
  canActivate(): boolean {
    const isAuthenticated = this.loginService.getLoginSuccessful(); 
    if (!isAuthenticated) {
      this.router.navigate(['login']); 
      return false;
    }
    return true;
  }
}

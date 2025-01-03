import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    imports: [NavbarComponent, RouterOutlet],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  constructor(private router:Router){}
  onGetStarted(){
    this.router.navigate(['login'])
  }
  onJoinNow(){
    this.router.navigate(['signup'])
  }
}

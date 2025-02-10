import { Component, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WalletBalanceModel } from '../modals/wallet-modals';
@Component({
    selector: 'app-home-nav',
    imports: [],
    templateUrl: './home-nav.component.html',
    styleUrl: './home-nav.component.css'
})
export class HomeNavComponent {
  constructor(private router:Router){}
  walletBalance = input.required<string>()
  onWalletClick(){
    this.router.navigate(['home'])
  }
  onUserClick(){
    this.router.navigate(['user'])
  }
}

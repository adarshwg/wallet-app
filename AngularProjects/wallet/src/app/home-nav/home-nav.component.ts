import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { WalletBalanceModel } from '../modals/modals';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css'
})
export class HomeNavComponent {
  constructor(private router:Router){}
  walletBalance = input.required<WalletBalanceModel>()
  onWalletClick(){
    this.router.navigate(['home'])
  }
  onUserClick(){
    this.router.navigate(['user'])
  }
}

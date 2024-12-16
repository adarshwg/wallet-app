import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { WalletService } from '../wallet/wallet.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SidebarComponent, HomeNavComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
      private loginService: LoginService,
      private walletService: WalletService,
    ) {}
    ngOnInit(): void {
      this.getwalletBalance()
    }
    get username(){
      return this.loginService.getUsername()
    } 
    onDetailsClick(){
      console.log('Details clicked')
    }
    getWalletBalanceValue(){
      return this.walletService.walletBalance
    }
  
    getwalletBalance(){
        this.walletService.getWalletBalance().subscribe(
        {
          next: (resData:any) =>{
            this.walletService.walletBalance.set(resData)
          },
          error:(err) => {
            console.log(err)
          }
        }
      )
    }
     
    
   
}

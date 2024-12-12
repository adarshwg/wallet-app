import {
  Component,
  DestroyRef,
  OnInit,
  signal
} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { SendMoneyComponent } from '../send-money/send-money.component';
import { ShowWalletComponent } from '../show-wallet/show-wallet.component';
import { WalletService } from '../wallet/wallet.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeNavComponent,
    SendMoneyComponent,
    ShowWalletComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private loginService: LoginService,
    private walletService: WalletService
  ) {}

  recentContacts! : string[]
  username = ''

  ngOnInit(): void {
    this.getRecentContacts()
    this.getWalletBalance()
  }
  getUsername(){
    this.username = this.loginService.getUsername()
  }
  getRecentContacts() {
      this.contactsService.getRecentContactsData().subscribe(
      {
        next: (resData :any)=>{
          console.log(resData)
          this.recentContacts = resData;
        },
        error: (err)=> {   
          console.log(err)
        }
      }
    )
  }
  getWalletBalance(){
    this.walletService.getWalletBalance().subscribe()
  }

  get WalletBalance(){
    return this.walletService.readWalletBalance()
  }
}

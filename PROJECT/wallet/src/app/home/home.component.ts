import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { SendMoneyComponent } from '../send-money/send-money.component';
import { ShowWalletComponent } from '../show-wallet/show-wallet.component';
import { WalletService } from '../wallet/wallet.service';
import { LoginService } from '../login/login.service';
import { Router, UrlSegment } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RecentContactsModel } from '../modals/transaction-modals';
import { WalletBalanceModel } from '../modals/wallet-modals';
import { UserDetailsModel } from '../modals/user-credentials-modals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
    selector: 'app-home',
    imports: [
        SidebarComponent,
        HomeNavComponent,
        SendMoneyComponent,
        ShowWalletComponent,
        ToastModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private loginService: LoginService,
    private walletService: WalletService,
    private router:Router,
    private userService: UserService,
    private messageService:MessageService
  ) {}
  destroyRef = inject(DestroyRef)
  recentContacts! : string[]
  username = ''

  ngOnInit(): void {    
    this.messageService.add(
      {
        severity:'info',
        summary:'Welcome',
        detail:'Welcome. Logged in successfully!'
      }
    )

    this.getUsername()
    this.getRecentContacts()
    this.getwalletBalance()
  }
  getUsername(){
      this.userService.getUserDetails()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: (userDetails:UserDetailsModel) => {
            console.log(userDetails)
            this.username = userDetails.username
          }
        }
      )  
  }
  getRecentContacts() {
      this.contactsService.getRecentContactsData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      {
        next: (recentContactsResponse :RecentContactsModel)=>{
          console.log(recentContactsResponse)
          this.recentContacts = recentContactsResponse;
        },
        error: (err)=> {   
          console.log(err)
        }
      }
    )
  }

  getWalletBalanceValue(){
    return this.walletService.walletBalance
  }

  getwalletBalance(){
      
      this.walletService.getWalletBalance()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      {
        next: (walletBalance:WalletBalanceModel) =>{
          this.walletService.walletBalance.set(walletBalance);
        },
        error:(err) => {
          console.log(err)
        }
      }
    )
  }
}

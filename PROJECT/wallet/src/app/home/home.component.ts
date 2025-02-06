import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
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
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-home',
  imports: [
    SidebarComponent,
    HomeNavComponent,
    SendMoneyComponent,
    ShowWalletComponent,
    ToastModule,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private loginService: LoginService,
    private walletService: WalletService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {}
  destroyRef = inject(DestroyRef);
  recentContacts!: string[];
  username = '';
  isLoading = false;
  ngOnInit(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Welcome',
      detail: 'Welcome. Logged in successfully!',
    });
    this.getRecentContacts();
    this.getwalletBalance();
    this.getUserDetails();
  }
  getRecentContacts() {
    if (!this.contactsService.recentContacts) {
      this.contactsService
        .getRecentContactsData()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (recentContactsResponse: RecentContactsModel) => {
            this.recentContacts = recentContactsResponse;
            this.contactsService.recentContacts = recentContactsResponse
          },
          error: (err) => {
            console.log(err);
          },
        });
    }else {
      this.recentContacts= this.contactsService.recentContacts
      console.log('loaded upppp from the serviceeeee')
    }
  }

  getWalletBalanceValue() {
    return this.walletService.walletBalance;
  }
  getUserDetails() {
    if (!this.userService.email || !this.userService.username) {
      this.isLoading = true;
      this.userService.getUserDetails().subscribe({
        next: (userDetails: UserDetailsModel) => {
          this.isLoading = false;
          console.log(userDetails);
          this.userService.username = userDetails.username;
          this.userService.email = userDetails.email;
          console.log('setting');
          console.log(this.userService.username, this.userService.email);
        },
        error: (err: any) => {
          this.isLoading = false;
        },
      });
    }
  }

  getwalletBalance() {
    const walletBalance = this.walletService.walletBalance().walletBalance
    console.log('.........',walletBalance,'.........')
    if (!walletBalance) {
      console.log(this.walletService.walletBalance())
      this.isLoading = true;
      this.walletService
        .getWalletBalance()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (walletBalance: WalletBalanceModel) => {
            this.isLoading=false;
            this.walletService.walletBalance.set(walletBalance);
          },
          error: (err) => {
            this.isLoading=false;
            console.log(err);
          },
        });
    }
    else {
      console.log('wallet balance is .....',walletBalance)
    }
  }
}

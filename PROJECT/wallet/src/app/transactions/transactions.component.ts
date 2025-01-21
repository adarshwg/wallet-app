import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { ContactsService } from '../contacts.service';
import { LoginService } from '../login/login.service';
import { WalletService } from '../wallet/wallet.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { TransactionsService } from './transactions.service';
import { TransactionModel, UserDetailsModel } from '../modals/modals';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../user/user.service';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { CurrentMonthTransactionsModel, PaginatedTransactionsModel } from '../modals/transaction-modals';
import { WalletBalanceModel } from '../modals/wallet-modals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transactions',
  imports: [SidebarComponent, HomeNavComponent, NgFor, FormsModule, NgxPaginationModule, TransactionDetailsComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  providers: []
})
export class TransactionsComponent implements OnInit {
  private destroyRef = inject(DestroyRef); // Inject DestroyRef

  constructor(
    private loginService: LoginService,
    private walletService: WalletService,
    private transactionsService: TransactionsService,
    private userService: UserService,
    private router: Router
  ) {}

  p: any;
  d = new Date();  
  date = this.d.getFullYear() + '-' + (this.d.getMonth() < 10 ? '0' : '') + (this.d.getMonth() + 1);
  isViewingTransaction = false;
  currentTransactionDetails!: TransactionModel;
  transactions!: CurrentMonthTransactionsModel;

  ngOnInit(): void {
    this.loadCurrentMonthTransactions();
    this.getWalletBalance();
    this.getUserDetails();
    console.log(this.date);
  }

  onStartViewingTransaction(transaction: TransactionModel) {
    this.currentTransactionDetails = transaction;
    this.isViewingTransaction = true;
  }

  onStopViewingTransaction() {
    this.isViewingTransaction = false;
  }

  getUserDetails() {
    this.userService.getUserDetails()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (userDetailsResponse: UserDetailsModel) => {
          console.log(userDetailsResponse);
          this.userService.username = userDetailsResponse.username;
          this.userService.email = userDetailsResponse.email;
        }
      });
  }

  get username() {
    return this.userService.username;
  }

  loadCurrentMonthTransactions() {
    this.transactionsService.currentMonthTransactions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (currentMonthTransactionsResponse: PaginatedTransactionsModel) => {
          console.log(currentMonthTransactionsResponse);
          console.log(currentMonthTransactionsResponse.items);
          this.transactions = currentMonthTransactionsResponse.items;
        }
      });
  }

  onDetailsClick() {
    console.log('Details clicked');
  }

  getWalletBalanceValue() {
    return this.walletService.walletBalance;
  }

  getWalletBalance() {
    this.walletService.getWalletBalance()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (walletBalanceResponse: WalletBalanceModel) => {
          this.walletService.walletBalance.set(walletBalanceResponse);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}

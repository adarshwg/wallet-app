import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HomeNavComponent } from "../home-nav/home-nav.component";
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-transactions',
  imports: [SidebarComponent, ToastModule, HomeNavComponent, NgFor, FormsModule, NgxPaginationModule, TransactionDetailsComponent, SpinnerComponent],
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
    private router: Router,
    private messageService: MessageService
  ) {}

  p: any;
  d = new Date();  
  date = this.d.getFullYear() + '-' + (this.d.getMonth() < 10 ? '0' : '') + (this.d.getMonth() + 1);
  month=10
  year=2024
  isViewingTransaction = false;
  currentTransactionDetails!: TransactionModel;
  transactions!: Array<TransactionModel>;
  selectedMonth: string = ''; 
  selectedYear: number = new Date().getFullYear(); 
  years: number[] = [];
  isLoading = false;

  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedYear = +target.value;
    console.log('Selected Year:', this.selectedYear);
    // Handle year change logic here
  }
  ngOnInit(): void {
    this.loadCurrentMonthTransactions();
    console.log(this.date);
  }

  onMonthChange(){
    console.log(this.date)
    const dateArray = this.date.split('-')
    const year = parseInt(dateArray[0])
    const month = parseInt(dateArray[1])
    this.transactionsService.allTransactionsForMonth(year,month)
    .subscribe(
      {
        next:(monthlyTransction: TransactionModel[])=> {
          console.log(monthlyTransction)
          console.log(monthlyTransction);
          this.transactions = monthlyTransction.reverse();
        },
        error:(err:any)=> {
          if(err.status===400){
            this.messageService.add(
              {
                severity:'info',
                summary:'Invalid date selected',
                detail:'Date selected is not valid!'
              }
            )
          }
        }
      }
    )    
  }

  onStartViewingTransaction(transaction: TransactionModel) {
    this.currentTransactionDetails = transaction;
    this.isViewingTransaction = true;
  }

  onStopViewingTransaction() {
    this.isViewingTransaction = false;
  }

  getUserDetails() {
    this.isLoading = true;
    this.userService.getUserDetails()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (userDetailsResponse: UserDetailsModel) => {
          this.isLoading = false;
          console.log(userDetailsResponse);
          this.userService.username = userDetailsResponse.username;
          this.userService.email = userDetailsResponse.email;
        },
        error: (err:any)=> {
          this.isLoading =false;
        }
      });
  }

  get username() {
    return this.userService.username;
  }

  loadCurrentMonthTransactions() {
    this.isLoading = true;
    this.transactionsService.currentMonthTransactions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (currentMonthTransactionsResponse: TransactionModel[]) => {
          this.isLoading = false;
          console.log(currentMonthTransactionsResponse);
          console.log(currentMonthTransactionsResponse);
          this.transactions = currentMonthTransactionsResponse;
          console.log(this.transactions)
        },
        error:(err:any)=> {
          this.isLoading  =false;
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

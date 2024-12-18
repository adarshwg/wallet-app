import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionModel } from '../modals/modals';
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { WalletService } from '../wallet/wallet.service';
import { UserService } from '../user/user.service';
import { DatePipe } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [HomeNavComponent, SidebarComponent,DatePipe,InfiniteScrollDirective],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
})
export class PaymentCardComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionsService: TransactionsService,
    private walletService: WalletService,
    private userService:UserService
  ) {
    this.snapshot = activatedRoute.snapshot;
  }
  snapshot: ActivatedRouteSnapshot;
  contactName!: string;
  username!:string;
  ngOnInit(): void {
    console.log(this.snapshot);
    this.contactName = this.snapshot.paramMap.get('contactName') || '';
    console.log('contact name:', this.contactName);
    this.getContactTransactions()
    this.getwalletBalance()
    this.getUsername()
  }
  contactTransactions! : [TransactionModel]
  items :string[] = []
  isLoading = false;
  currentPage=1
  itemsPerPage=10;

  toggleLoading = ()=> this.isLoading = !this.isLoading



  getUsername(){
    this.userService.getUserDetails().subscribe(
      {
        next:(resData:any) => {
          this.username = resData.username
        }
      }
    )
  }
  getContactTransactions(){
    this.transactionsService.getTransactionsForContact(this.contactName).subscribe(
      {
        next: (resData:any) => {
          console.log(resData)
          this.contactTransactions = resData
        }
      }
    )
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

import { Component, NgModule, OnInit, signal } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { ContactsService } from '../contacts.service';
import { LoginService } from '../login/login.service';
import { WalletService } from '../wallet/wallet.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { TransactionsService } from './transactions.service';
import { TransactionModel } from './transactions.model';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SidebarComponent, HomeNavComponent,NgFor,FormsModule, NgxPaginationModule],  
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  providers: [NgModel]
})
export class TransactionsComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private walletService: WalletService,
    private transactionsService: TransactionsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.currentMonthTransactions
    this.getwalletBalance()
    console.log(this.date)
  }
  p:any
  d = new Date();
  date = this.d.getFullYear()+'-'+(this.d.getMonth()+1)
  get username(){
    return this.loginService.getUsername()
  } 
  transactions! : [TransactionModel]
  get currentMonthTransactions(){
    return this.transactionsService.currentMonthTransactions().subscribe({
      next:(resData:any) => {
        console.log(resData.items)
        this.transactions = resData.items
      }
    })
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';
import { ContactTransactionsURL, RecentContactsURL, TransactionsURL } from '../endpoints/transaction-endpoints';
import { ContactTransactionsModel, PaginatedTransactionsModel } from '../modals/transaction-modals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {  
  constructor(private http:HttpClient, private walletService: WalletService) { }
  currentMonthTransactions() : Observable<PaginatedTransactionsModel>{
    const token = localStorage.getItem('access_token');
    return this.http.get<PaginatedTransactionsModel>(TransactionsURL, {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })    
  }
  getTransactionsForContact(contactName:string) : Observable<ContactTransactionsModel>{
    const token = localStorage.getItem('access_token');
    return this.http.get<ContactTransactionsModel>(ContactTransactionsURL+contactName,{
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
}

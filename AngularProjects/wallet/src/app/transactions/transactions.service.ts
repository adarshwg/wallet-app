import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  
  constructor(private http:HttpClient, private walletService: WalletService) { }

  currentMonthTransactions(){
    const token = localStorage.getItem('access_token');
    return this.http.get('http://localhost:8000/transactions/month', {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  
}

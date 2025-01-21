import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PaymentDetailsModel } from '../modals/modals';
import { SendMoneyModel, WalletBalanceModel } from '../modals/wallet-modals';
import { HttpResponse } from '@angular/common/http';
import { PaymentURL, WalletBalanceURL } from '../endpoints/wallet-endpoints';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  walletBalance = signal<WalletBalanceModel>({
    walletBalance:''
  });
  constructor(private http: HttpClient){}
  getWalletBalance() : Observable<WalletBalanceModel> {
    const token = localStorage.getItem('access_token');
    return this.http
    .get<WalletBalanceModel>(WalletBalanceURL, {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    }).pipe(tap({
      next:(resData:WalletBalanceModel)=>{
        this.walletBalance.set(resData)
      }
    }))
  }
  sendMoney(receiver:string, amount:string, mudra_pin:number): Observable<SendMoneyModel>{
    const token = localStorage.getItem('access_token')
    return this.http.post<SendMoneyModel>(PaymentURL,{
      receiver:receiver,
      amount:parseInt(amount),
      mudra_pin: mudra_pin,
      category: 'misc'
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    }).pipe(tap({
      next:(resData:SendMoneyModel)=>{
        this.walletBalance.set(resData.remainingBalance)
        //add message of the remaining balance
      }
    }))
  }
}

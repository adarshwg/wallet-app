import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private walletBalance = signal<string>('0');
  readWalletBalance = this.walletBalance.asReadonly;
  constructor(private http: HttpClient){}
  getWalletBalance() {
    const token = localStorage.getItem('access_token');
    return this.http
    .get('http://localhost:8000/wallet/balance', {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    }).pipe(tap({
      next:(resData:any)=>{
        this.walletBalance.set(resData)
      }
    }))
  }
  sendMoney(receiver:string, amount:number, mudra_pin:number){
    const token = localStorage.getItem('access_token')
    return this.http.post('http://localhost:8000/wallet/payment',{
      receiver:receiver,
      amount:amount,
      mudra_pin: mudra_pin,
      category: 'misc'
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })      
  }
}

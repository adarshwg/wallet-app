import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WalletService } from '../wallet/wallet.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient, private walletService: WalletService) { }
  username = '';
  email =''
  getUserDetails(){
      const token = localStorage.getItem('access_token');
      return this.http.get('http://localhost:8000/user/details', {
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      })
  }
}

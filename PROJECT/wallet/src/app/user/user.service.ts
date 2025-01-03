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
  verifyMudraPin(mudraPin:number){
    const token = localStorage.getItem('access_token');
    return this.http.post('http://localhost:8000/user/pin-verification', {
      entered_mudra_pin:mudraPin
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  verifyPassword(password:string){
    const token = localStorage.getItem('access_token');
    return this.http.post('http://localhost:8000/user/password-verification', {
      entered_password:password
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  updateMudraPin(newMudraPin:number){
    const token = localStorage.getItem('access_token');
    return this.http.post('http://localhost:8000/user/mudra-pin', {
      entered_mudra_pin:newMudraPin
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  updatePassword(newPassword:string){
    const token = localStorage.getItem('access_token');
    return this.http.post('http://localhost:8000/user/password', {
      entered_password:newPassword
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  checkIfUserExists(username:string){
    const token = localStorage.getItem('access_token');
      return this.http.get('http://localhost:8000/user/contacts/'+username+'/exists', {
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      })
  }

}

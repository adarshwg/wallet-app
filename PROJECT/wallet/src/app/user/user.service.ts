import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateMudraPinURL, UpdatePasswordURL, UserDetailsURL, VerifyUserExistsURL } from '../endpoints/user-endpoints';
import { MudraPinVerificationURL, PasswordVerificationURL } from '../endpoints/auth-endpoints';
import { NewPassowrdModel, NewPinModel, UpdateMudraPinModel, UpdatePasswordModel, VerifyMudraPinModel, VerifyPasswordModel, VerifyUserExistsModel } from '../modals/user-credentials-modals';
import { UserDetailsModel } from '../modals/modals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }
  username = '';
  email =''
  getUserDetails(): Observable<UserDetailsModel>{
      const token = localStorage.getItem('access_token');
      return this.http.get<UserDetailsModel>(UserDetailsURL, {
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      })
  }
  verifyMudraPin(mudraPin:number) {
    const token = localStorage.getItem('access_token');
    return this.http.post(MudraPinVerificationURL, {
      entered_mudra_pin:mudraPin
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  verifyPassword(password:string) : Observable<VerifyPasswordModel>{
    const token = localStorage.getItem('access_token');
    return this.http.post<VerifyPasswordModel>(PasswordVerificationURL, {
      entered_password:password
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  updateMudraPin(newMudraPin:NewPinModel) {
    const token = localStorage.getItem('access_token');
    return this.http.post(UpdateMudraPinURL, {
      entered_pin:newMudraPin.entered_pin,
      new_pin:newMudraPin.new_pin
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  updatePassword(newPassword:NewPassowrdModel){
    const token = localStorage.getItem('access_token');
    return this.http.post(UpdatePasswordURL, {
      entered_password:newPassword.entered_password,
      new_password:newPassword.new_password
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  checkIfUserExists(username:string): Observable<VerifyUserExistsModel>{
    const token = localStorage.getItem('access_token');
      return this.http.get<VerifyUserExistsModel>(VerifyUserExistsURL+username+'/exists', {
        headers: new HttpHeaders().set('Authorization','Bearer '+token)
      })
  }

}

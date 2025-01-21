import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateMudraPinURL, UpdatePasswordURL, UserDetailsURL, VerifyUserExistsURL } from '../endpoints/user-endpoints';
import { MudraPinVerificationURL, PasswordVerificationURL } from '../endpoints/auth-endpoints';
import { UpdateMudraPinModel, UpdatePasswordModel, VerifyMudraPinModel, VerifyPasswordModel, VerifyUserExistsModel } from '../modals/user-credentials-modals';
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
  verifyMudraPin(mudraPin:number) : Observable<VerifyMudraPinModel>{
    const token = localStorage.getItem('access_token');
    return this.http.post<VerifyMudraPinModel>(MudraPinVerificationURL, {
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
  updateMudraPin(newMudraPin:number) : Observable<UpdateMudraPinModel>{
    const token = localStorage.getItem('access_token');
    return this.http.post<UpdateMudraPinModel>(UpdateMudraPinURL, {
      entered_mudra_pin:newMudraPin
    },
    {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
  updatePassword(newPassword:string) : Observable<UpdatePasswordModel>{
    const token = localStorage.getItem('access_token');
    return this.http.post<UpdatePasswordModel>(UpdatePasswordURL, {
      entered_password:newPassword
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

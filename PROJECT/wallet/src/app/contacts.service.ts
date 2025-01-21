import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecentContactsURL } from './endpoints/transaction-endpoints';
import { RecentContactsModel } from './modals/transaction-modals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) {}
  getRecentContactsData(): Observable<RecentContactsModel>{
    const token = localStorage.getItem('access_token');
    return this.http.get<RecentContactsModel>(RecentContactsURL, {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient) {}
  getRecentContactsData() {
    const token = localStorage.getItem('access_token');
    return this.http.get('http://localhost:8000/transactions/recent-contacts', {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })
  }
}
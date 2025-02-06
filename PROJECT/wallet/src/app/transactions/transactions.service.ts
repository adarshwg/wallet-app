import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactTransactionsURL, RecentContactsURL, TransactionsURL } from '../endpoints/transaction-endpoints';
import { ContactTransactionsModel, PaginatedTransactionsModel } from '../modals/transaction-modals';
import { Observable } from 'rxjs';
import { TransactionModel } from '../modals/modals';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {  
  constructor(private http:HttpClient) { }
  allTransactionsForMonth(year:number,month:number):  Observable<TransactionModel[]> {
    const token = localStorage.getItem('access_token');
    return this.http.get<TransactionModel[]>(TransactionsURL+'?month='+month+'&'+'year='+year, {
      headers: new HttpHeaders().set('Authorization','Bearer '+token)
    })  
  }
  currentMonthTransactions() : Observable<TransactionModel[]>{
    const token = localStorage.getItem('access_token');
    return this.http.get<TransactionModel[]>(TransactionsURL, {
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

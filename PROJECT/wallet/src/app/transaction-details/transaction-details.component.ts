import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { TransactionModel } from '../modals/modals';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transaction-details',
    imports: [],
    templateUrl: './transaction-details.component.html',
    styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {
  constructor(private userService: UserService, private router:Router) {}
  ngOnInit(): void {
    this.getCurrentUserDetails();
  }
  username = '';
  getCurrentUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: (resData: any) => {
        console.log('user details called inside transaction details');
        this.username = resData.username;
      },
    });
  }

  getHourStatus(hour: number) {
    return hour < 11 ? 'a.m.' : 'p.m.';
  }
  getMinuteStatus(minutes: number) {
    return minutes < 10 ? '0' + minutes : minutes;
  }
  getTransactionMonth(month: number): string {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        throw new Error('Invalid month');
    }
  }

  getTransactionTime(transaction: TransactionModel) {
    return (
      transaction.day +
      ' ' +
      this.getTransactionMonth(transaction.month) +
      ' ' +
      transaction.year +
      ', ' +
      transaction.hours +
      ':' +
      this.getMinuteStatus(transaction.minutes) +
      ' ' +
      this.getHourStatus(transaction.hours)
    );
  }
  transactionDetails = input.required<TransactionModel>();
  @Output() cancel = new EventEmitter();
  onCancel() {
    this.cancel.emit();
  }
  onPay(receiverUsername: string){
    console.log('onpayyyy')
    console.log(receiverUsername)
    this.router.navigate(['home','pay-contact',receiverUsername])
  }
}

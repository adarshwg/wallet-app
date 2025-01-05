import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TransactionsService } from '../transactions/transactions.service';
import {
  PaymentDetailsModel,
  TransactionModel,
  UserDetailsModel,
} from '../modals/modals';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { WalletService } from '../wallet/wallet.service';
import { UserService } from '../user/user.service';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { validateAmount } from '../validators/payment-validation';

@Component({
  selector: 'app-payment-card',
  imports: [
    HomeNavComponent,
    SidebarComponent,
    DatePipe,
    ReactiveFormsModule,
    ConfirmPaymentComponent,
    ToastModule,
  ],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.css',
})
export class PaymentCardComponent implements OnInit, AfterViewChecked {
  constructor(
    private activatedRoute: ActivatedRoute,
    private transactionsService: TransactionsService,
    private walletService: WalletService,
    private userService: UserService,
    private messageService: MessageService
  ) {
    this.snapshot = activatedRoute.snapshot;
  }
  snapshot: ActivatedRouteSnapshot;
  contactName!: string;
  username!: string;
  paymentConfirmation = false;
  @ViewChild('scrollMe') private transactionScrollContainer!: ElementRef;
  scrollToBottom(): void {
    try {
      this.transactionScrollContainer.nativeElement.scrollTop =
        this.transactionScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  ngOnInit(): void {
    console.log(this.snapshot);
    this.contactName = this.snapshot.paramMap.get('contactName') || '';
    console.log('contact name:', this.contactName);
    this.getContactTransactions();
    this.getwalletBalance();
    this.getUsername();
    this.scrollToBottom();
  }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
  contactTransactions!: [TransactionModel];
  enteredAmount!: string;
  paymentForm = new FormGroup({
    amount: new FormControl('',{
      validators: [Validators.required,validateAmount],
    }),
  });
  onCancel() {
    this.paymentConfirmation = false;
  }
  onPayClick() {
    console.log(this.paymentForm.valid)
    if(this.paymentForm.valid){
      this.paymentConfirmation = true;
      this.enteredAmount = this.paymentForm.value.amount!;
    }
    else {
      this.paymentForm.reset()
      this.messageService.add(
        {
          severity:'warn',
          summary:'Invalid amount entered',
          detail:'Please enter valid amount!'
        }
      )
    }
    
  }
  onSubmitMudraPin(mudraPin: number) {
    this.paymentConfirmation = false;
    this.userService.verifyMudraPin(mudraPin).subscribe({
      next: (resData: any) => {
        //mudra pin entered is correct
        if(resData){
          this.walletService
          .sendMoney(this.contactName, this.enteredAmount, mudraPin)
          .subscribe({
            next: (resData) => {
              console.log(resData);
              this.getContactTransactions();
              this.paymentConfirmation = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Amount Sent Successfuly',
                detail:
                  '₹ ' +
                  this.enteredAmount +
                  ' sent successfully to ' +
                  this.contactName,
              });
            },
            error: (err:any) => {
              //insufficient balance error
              if(err.status==403){
                this.messageService.add({
                  severity: 'error',
                  summary: 'Insufficient Balance 😕',
                  detail: 'User Balance is low for the transaction'
                });
                console.log(err);
              }              
            },
          });
        }
        //incorrect pin entered
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Payment Unsuccessful',
            detail: 'Incorrect Mudra Pin entered.'
          });
        }
      },
      error: (err) => {
        console.log('caught hereeee')
        console.log(err);
      },
    });
    this.paymentForm.reset()
  }
  getUsername() {
    this.userService.getUserDetails().subscribe({
      next: (resData: any) => {
        console.log(resData);
        this.username = resData.username;
      },
    });
  }
  getContactTransactions() {
    this.transactionsService
      .getTransactionsForContact(this.contactName)
      .subscribe({
        next: (resData: any) => {
          console.log(resData);
          this.contactTransactions = resData;
        },
      });
  }
  getWalletBalanceValue() {
    return this.walletService.walletBalance;
  }

  getwalletBalance() {
    this.walletService.getWalletBalance().subscribe({
      next: (resData: any) => {
        this.walletService.walletBalance.set(resData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

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
  otpVerified = false;
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
  enteredAmount!: number;
  paymentForm = new FormGroup({
    amount: new FormControl(0,{
      validators: [Validators.required],
    }),
  });
  onCancel() {
    this.paymentConfirmation = false;
  }
  onPayClick() {
    if(this.paymentForm.valid){
      this.paymentConfirmation = true;
      this.enteredAmount = this.paymentForm.value.amount!;
    }
    else {
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
    this.userService.verifyMudraPin(mudraPin).subscribe({
      next: (resData: any) => {
        this.otpVerified = resData;
        console.log(resData);
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
            error: (err) => {
              console.log(err);
            },
          });
      },
      error: (err) => {
        console.log(err);
      },
    });
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

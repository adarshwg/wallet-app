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
import { ContactTransactionsModel, TransactionsModel } from '../modals/transaction-modals';
import { SendMoneyModel, WalletBalanceModel } from '../modals/wallet-modals';
import { VerifyMudraPinModel } from '../modals/user-credentials-modals';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-payment-card',
  imports: [
    HomeNavComponent,
    SidebarComponent,
    DatePipe,
    ReactiveFormsModule,
    ConfirmPaymentComponent,
    ToastModule,
    SpinnerComponent
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
  contactTransactions!: Array<TransactionsModel>
  enteredAmount!: string;
  paymentForm = new FormGroup({
    amount: new FormControl('',{
      validators: [Validators.required,validateAmount],
    }),
  });
  isLoading = false;
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
    this.isLoading=true;
    this.paymentConfirmation = false;
    this.userService.verifyMudraPin(mudraPin).subscribe({
      next: (verifyPinResponse: any) => {
        //mudra pin entered is correct
        if(verifyPinResponse){
          this.walletService
          .sendMoney(this.contactName, this.enteredAmount, mudraPin)
          .subscribe({
            next: (verifyPinResponse:any) => {
              this.isLoading=false;
              console.log(verifyPinResponse);
              const remainingBalance = verifyPinResponse.body.transaction.remainingBalance
              console.log(verifyPinResponse.body.transaction.remainingBalance,'ijfifjjfkfskfjskl')
              this.walletService.getWalletBalance()
              this.walletService.walletBalance.set(remainingBalance)
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
              this.isLoading=false;
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
          this.isLoading=false;
          this.messageService.add({
            severity: 'error',
            summary: 'Payment Unsuccessful',
            detail: 'Incorrect Mudra Pin entered.'
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.log('caught hereeee')
        console.log(err);
      },
    });
    this.paymentForm.reset()
  }
  getUsername() {
    this.isLoading=true;
    this.userService.getUserDetails().subscribe({
      next: (userDetails: UserDetailsModel) => {
        this.isLoading=false;
        console.log(userDetails);
        this.username = userDetails.username;
      },
    });
  }
  getContactTransactions() {
    this.isLoading=true;
    this.transactionsService
      .getTransactionsForContact(this.contactName)
      .subscribe({
        next: (contactTransactions: ContactTransactionsModel) => {
          this.isLoading=false;
          console.log(contactTransactions);
          this.contactTransactions = contactTransactions;
        },
      });
  }
  getWalletBalanceValue() {
    return this.walletService.walletBalance;
  }

  getwalletBalance() {
    this.isLoading=true;
    this.walletService.getWalletBalance().subscribe({
      next: (walletBalance: string) => {
        this.isLoading=false;
        this.walletService.walletBalance.set(walletBalance);
      },
      error: (err) => {
        this.isLoading=false;
        console.log(err);
      },
    });
  }
}

import { Component, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WalletService } from '../wallet/wallet.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.css',
})
export class SendMoneyComponent {
  constructor(private walletService: WalletService) {}
  recentContacts = input.required<string[]>();
  paymentForm = new FormGroup({
    receiverUsername: new FormControl('', {
      validators: [Validators.required],
    }),
    amount: new FormControl(0, {
      validators: [Validators.min(0)],
    }),
    mudraPin: new FormControl(0, {
      validators: [Validators.required],
    }),
  });
  setAmount(amount: number) {
    this.paymentForm.patchValue({ amount: amount });
    this.walletService.getWalletBalance();
  }
  setContact(contact: string) {
    this.paymentForm.patchValue({ receiverUsername: contact });
  }
  onSubmit() {
    console.log('the contacts i got are : ', this.recentContacts());
    this.walletService
      .sendMoney(
        this.paymentForm.value.receiverUsername!,
        this.paymentForm.value.amount!,
        this.paymentForm.value.mudraPin!
      )
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.walletService
      .getWalletBalance()
      .subscribe(
        {
          next: (resData:any) => {  
            // this.walletService.walletBalance.set(resData)
            console.log(resData)
          },
          error: (err) => {
            console.log(err)
          }
        }
      );
  }
}

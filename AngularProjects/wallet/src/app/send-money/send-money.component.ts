import { Component, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WalletService } from '../wallet/wallet.service';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-money',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.css',
})
export class SendMoneyComponent {
  constructor(private walletService: WalletService,private router:Router) {}
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
    console.log(contact)
    this.router.navigate(['home','pay-contact',contact])
  }
  onSubmit() {
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
    
  }
}

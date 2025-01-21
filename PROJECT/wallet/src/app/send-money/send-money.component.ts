import { Component, input, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WalletService } from '../wallet/wallet.service';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { validateUsernameFormat } from '../validators/payment-validation';
import { VerifyUserExistsModel } from '../modals/user-credentials-modals';

@Component({
  selector: 'app-send-money',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './send-money.component.html',
  styleUrl: './send-money.component.css',
})
export class SendMoneyComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}
  recentContacts = input.required<string[]>();

  paymentForm = new FormGroup({
    receiverUsername: new FormControl('', {
      validators: [Validators.required, validateUsernameFormat],
    }),
  });
  payContact(contact: string) {
    console.log(contact);
    this.router.navigate(['home', 'pay-contact', contact]);
  }
  onPayUserSubmit() {
    if (this.paymentForm.valid) {
      const receiver = this.paymentForm.value.receiverUsername!;
      this.userService.checkIfUserExists(receiver).subscribe({
        next: (userExistsResponse: VerifyUserExistsModel) => {
          console.log(userExistsResponse, 'is the user status');
          if (userExistsResponse == true) {
            this.router.navigate(['home', 'pay-contact', receiver]);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Payment Failed',
              detail: receiver + ' : user does not exist!',
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    else {
      if(this.paymentForm.untouched || this.paymentForm.pristine){
        this.messageService.add({
          severity: 'warn',
          summary: 'Enter a username',
          detail: 'No username entered',
        });
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Enter valid username',
          detail: 'Invalid username entered',
        });
      }
      
    }
  }
}

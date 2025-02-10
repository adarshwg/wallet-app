import { Component, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { validateUsernameFormat } from '../validators/payment-validation';
import { VerifyUserExistsModel } from '../modals/user-credentials-modals';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-send-money',
  imports: [ReactiveFormsModule, ToastModule,SpinnerComponent],
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

  isLoading = false;

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
    this.isLoading=true;
    if (this.paymentForm.valid) {
      const receiver = this.paymentForm.value.receiverUsername!;
      this.userService.checkIfUserExists(receiver).subscribe({
        next: (userExistsResponse: VerifyUserExistsModel) => {
          this.isLoading=false;
          console.log(userExistsResponse, 'is the user status');
          if (userExistsResponse == true) {
            this.router.navigate(['home', 'pay-contact', receiver]);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Payment Failed',
              detail: receiver + ' : User does not exist!',
            });
            this.paymentForm.reset();
          }
        },
        error: (err) => {
          this.isLoading=false;
          console.log(err);
        },
      });
    }
    else {
      this.isLoading=false;
      if(this.paymentForm.untouched || this.paymentForm.pristine){
        this.messageService.add({
          severity: 'warn',
          summary: 'Enter a username',
          detail: 'No username entered',
        });
      }
      else {
        this.isLoading=false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Enter valid username',
          detail: 'Invalid username entered',
        });
      }
      
    }
  }
}

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
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-send-money',
    imports: [ReactiveFormsModule],
    templateUrl: './send-money.component.html',
    styleUrl: './send-money.component.css'
})
export class SendMoneyComponent {
  constructor(private userService: UserService,private router:Router) {}
  recentContacts = input.required<string[]>();
  paymentForm = new FormGroup({
    receiverUsername: new FormControl('', {
      validators: [Validators.required],
    })
  });
  payContact(contact: string) {
    console.log(contact)
    this.router.navigate(['home','pay-contact',contact])
  }
  onPayUserSubmit() {
    const receiver = this.paymentForm.value.receiverUsername!
    this.userService.checkIfUserExists(receiver).subscribe(
      {
        next:(resData:any)=> {
          console.log(resData,'is the user status')
          if(resData==true){
            this.router.navigate(['home','pay-contact',receiver])
          }
        },
        error:(err) =>{
          console.log(err)
        }
      },
      
    )
    
  }
}

import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { WalletService } from '../wallet/wallet.service';
import { UserService } from './user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePinComponent } from '../change-pin/change-pin.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NewPassowrdModel, UpdateMudraPinModel, UpdatePasswordModel } from '../modals/user-credentials-modals';
import { UserDetailsModel } from '../modals/modals';
import { SpinnerComponent } from "../spinner/spinner.component";
@Component({
  selector: 'app-user',
  imports: [
    SidebarComponent,
    HomeNavComponent,
    ChangePasswordComponent,
    ChangePinComponent,
    ToastModule,
    SpinnerComponent
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private walletService: WalletService,
    private userService: UserService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    // this.getwalletBalance();
    // this.getUserDetails();
  }
  isLoading = false;
  isChangingPassword = false;
  isChangingPin = false;

  getUserDetails() {    
    this.isLoading = true;
    this.userService.getUserDetails().subscribe({
      next: (userDetails: UserDetailsModel) => {
        this.isLoading = false;
        console.log(userDetails);
        this.userService.username = userDetails.username;
        this.userService.email = userDetails.email;
      },
      error:(err:any)=> {
        this.isLoading = false;
      }
    });
  }
  get username() {
    console.log('called get username',this.userService.username)
    return this.userService.username;
  }
  get email() {
    return this.userService.email;
  }
  onDetailsClick() {
    console.log('Details clicked');
  }
  getWalletBalanceValue() {
    return this.walletService.walletBalance;
  }
  // getwalletBalance() {
  //   return this.walletService.walletBalance
  //   // this.walletService.getWalletBalance().subscribe({
  //   //   next: (walletBalance: WalletBalanceModel) => {
  //   //     this.walletService.walletBalance.get(walletBalance);
  //   //   },
  //   //   error: (err) => {
  //   //     console.log(err);
  //   //   },
  //   // });
  // }
  onChangePasswordStart() {
    this.isLoading= true;
    this.isChangingPassword = true;
  }
  onChangePassword(newPassword: NewPassowrdModel) {
    console.log('changing the user password');
    this.userService.updatePassword(newPassword).subscribe({
      next: (updatePasswordResponse: any) => {
        this.isLoading=false;
        console.log(updatePasswordResponse);
        this.messageService.add({
          severity: 'success',
          summary: 'Password changed',
          detail: 'Your Password has been changed successfully',
        });
        this.isChangingPassword = false;
      },
      error: (err) => {
        this.isLoading=false;
        console.log(err);
      },
    });
  }
  onChangeMudraPinStart() {
    console.log('starting')
    this.isChangingPin = true;
  }
  onChangeMudraPin(newMudraPin: number) {
    this.isLoading = true;
    console.log('changing the mudra pin');
    this.userService.updateMudraPin(newMudraPin).subscribe({
      next: (updatePinResponse: any) => {
        this.isLoading = false;
        console.log(updatePinResponse);
        this.messageService.add({
          severity: 'success',
          summary: 'Pin changed successful!',
          detail: 'Your Mudra Pin has been changed successfully',
        });
        this.isChangingPin = false;
      },
      error: (err) => {
        this.isLoading=false;
        console.log(err);
      },
    });
  }
  onCancel() {
    this.isChangingPassword = false;
    this.isChangingPin = false;
  }
}

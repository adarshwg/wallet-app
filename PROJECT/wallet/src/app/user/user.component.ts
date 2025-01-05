import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HomeNavComponent } from '../home-nav/home-nav.component';
import { WalletService } from '../wallet/wallet.service';
import { UserService } from './user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePinComponent } from '../change-pin/change-pin.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-user',
  imports: [
    SidebarComponent,
    HomeNavComponent,
    ChangePasswordComponent,
    ChangePinComponent,
    ToastModule,
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
    this.getwalletBalance();
    this.getUserDetails();
  }
  isChangingPassword = false;
  isChangingPin = false;

  getUserDetails() {
    this.userService.getUserDetails().subscribe({
      next: (resData: any) => {
        console.log(resData);
        this.userService.username = resData.username;
        this.userService.email = resData.email;
      },
    });
  }
  get username() {
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
  onChangePasswordStart() {
    this.isChangingPassword = true;
  }
  onChangePassword(newPassword: string) {
    console.log('changing the user password');
    this.userService.updatePassword(newPassword).subscribe({
      next: (resData: any) => {
        console.log(resData);
        this.isChangingPassword = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onChangeMudraPinStart() {
    console.log('starting')
    this.isChangingPin = true;
  }
  onChangeMudraPin(newMudraPin: number) {
    console.log('changing the mudra pin');
    this.userService.updateMudraPin(newMudraPin).subscribe({
      next: (resData: any) => {
        console.log(resData);
        this.isChangingPin = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onCancel() {
    this.isChangingPassword = false;
    this.isChangingPin = false;
  }
}

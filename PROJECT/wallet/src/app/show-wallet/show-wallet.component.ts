import { Component, input, Input, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { WalletService } from '../wallet/wallet.service';
import { WalletBalanceModel } from '../modals/modals';

@Component({
    selector: 'app-show-wallet',
    imports: [],
    templateUrl: './show-wallet.component.html',
    styleUrl: './show-wallet.component.css'
})
export class ShowWalletComponent{
  usernameInput = input.required<string>()
  walletBalanceInput = input.required<WalletBalanceModel>()
}

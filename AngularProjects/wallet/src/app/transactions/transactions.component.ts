import { Component, signal } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { HomeNavComponent } from "../home-nav/home-nav.component";
import { ContactsService } from '../contacts.service';
import { LoginService } from '../login/login.service';
import { WalletService } from '../wallet/wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SidebarComponent, HomeNavComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  constructor(
    private loginService: LoginService,
    private walletService: WalletService,
    private router: Router
  ) {}
  username = signal<string>('');
  walletBalance = signal<number>(0);
  ngOnInit(): void {
    
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ShowWalletComponent } from './show-wallet/show-wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    children: [
      {
        path: '',
        component: SignupComponent,
      },
      {
        path: 'otp',
        component: OtpComponent,
      },
    ],
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  
];

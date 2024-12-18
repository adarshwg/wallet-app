import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtpComponent } from './otp/otp.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserComponent } from './user/user.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';

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
    children:[
      {
        path: '',
        component:HomeComponent,
      },
      {
        path: 'pay-contact/:contactName',
        component: PaymentCardComponent
      }
    ]
  },
  {
    path: 'user',
    component: UserComponent
  }  
];

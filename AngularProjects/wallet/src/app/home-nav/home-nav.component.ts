import { Component, input } from '@angular/core';

@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.css'
})
export class HomeNavComponent {
  walletBalance = input.required<string>()
}

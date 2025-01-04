import { Component, EventEmitter, input, Output } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { validatePinDigit } from '../validators/payment-validation';

@Component({
    selector: 'app-confirm-payment',
    imports: [FormsModule, ReactiveFormsModule,ToastModule],
    templateUrl: './confirm-payment.component.html',
    styleUrls: ['./confirm-payment.component.css']
})
export class ConfirmPaymentComponent {
  constructor(private messageService:MessageService){}
  @Output() cancel = new EventEmitter();
  @Output() mudraPin = new EventEmitter<number>();
  // failedAttempt = input.required<boolean>()
  mudraPinForm = new FormGroup({
    pin1: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
    pin2: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
    pin3: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
    pin4: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
    pin5: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
    pin6: new FormControl('', {
      validators: [Validators.required,validatePinDigit],
    }),
  });

  onCancel() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Payment Failed',
      detail: 'Payment Cancelled by the user',
    });
    this.cancel.emit();
  }

  moveToNext(event: Event, nextControlName: string) {
    const input = event.target as HTMLInputElement;

    if (input.value.length === 1) {
      const nextControl = document.querySelector(
        `input[formControlName="${nextControlName}"]`
      ) as HTMLInputElement;

      if (nextControl) {
        nextControl.focus();
      }
    }
  }

  moveToPrevious(event: KeyboardEvent, currentControlName: string) {
    const input = event.target as HTMLInputElement;

    // Check for backspace key
    if (event.key === 'Backspace' && input.value === '') {
      const previousControl = document.querySelector(
        `input[formControlName="${currentControlName}"]`
      ) as HTMLInputElement;

      if (previousControl) {
        previousControl.focus();
        // Optionally clear the previous input field
        previousControl.value = '';
      }
    }
  }

  onSubmitMudraPin() {
    console.log('hereeeeeee')
    if (this.mudraPinForm.valid) {
      const mudraPin = Object.values(this.mudraPinForm.value).join('');
      const mudraPinValue = parseInt(mudraPin)
      console.log('Mudra Pin:', mudraPin);
      this.mudraPin.emit(mudraPinValue)
    } else {
      this.mudraPinForm.reset()
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Pin!',
        detail: 'Invalid pin entered! ',
      });
      console.error('Invalid Pin');
    }
  }
}

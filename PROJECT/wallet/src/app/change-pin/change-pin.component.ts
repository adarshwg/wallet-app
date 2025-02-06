import { Component, DestroyRef, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user/user.service';
import { validateMudraPinFormat } from '../validators/change-pin-validations';
import { MessageService } from 'primeng/api';
import { VerifyMudraPinModel } from '../modals/user-credentials-modals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-change-pin',
  imports: [ReactiveFormsModule],
  templateUrl: './change-pin.component.html',
  styleUrl: './change-pin.component.css',
})
export class ChangePinComponent {
  constructor(private userService: UserService
    ,private messageService: MessageService) {}
  cancel = output();
  destroyRef = inject(DestroyRef)
  newMudraPin = output<number>();
  changePinForm = new FormGroup({
    currentPin: new FormControl('', {
      validators: [Validators.required, validateMudraPinFormat],
    }),
    newPin: new FormControl('', {
      validators: [Validators.required, validateMudraPinFormat],
    }),
    confirmNewPin: new FormControl('', {
      validators: [Validators.required, validateMudraPinFormat],
    }),
  });
  onSubmit() {
    if (this.changePinForm.valid) {
      const currentPin = parseInt(this.changePinForm.value.currentPin!);
      const newPin = this.changePinForm.value.newPin;
      const confirmNewPin = this.changePinForm.value.confirmNewPin;
      console.log(currentPin, newPin, confirmNewPin, ' is the psssss');
      if(newPin===confirmNewPin){
        this.userService.verifyMudraPin(currentPin)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (verifyPinResponse: any) => {
            console.log(verifyPinResponse);
            if (verifyPinResponse) {
                this.newMudraPin.emit(parseInt(newPin!));
            }else {
              this.messageService.add({
                severity: 'error',
                summary: 'Invalid Pin!',
                detail: 'Invalid pin entered! ',
              });
              this.changePinForm.reset();
            }
          },
        });
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Pins Do not Match!',
          detail: 'New pin and confirm pin do not match! ',
        });
      }
      
    }else if(this.changePinForm.pristine){
      this.messageService.add({
        severity: 'info',
        summary: 'No values entered',
        detail: 'No values for the pin entered! ',
      });
    }else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Pin',
        detail: 'Please enter pins in correct format! ',
      });
    }
  }
  onCancel() {
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'Pin change cancelled',
    });
    this.cancel.emit();
  }
}

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
import { NewPinModel, VerifyMudraPinModel } from '../modals/user-credentials-modals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from "../spinner/spinner.component";
@Component({
  selector: 'app-change-pin',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './change-pin.component.html',
  styleUrl: './change-pin.component.css',
})
export class ChangePinComponent {
  constructor(private userService: UserService
    ,private messageService: MessageService) {}
  cancel = output();
  destroyRef = inject(DestroyRef)
  newMudraPin = output<NewPinModel>();
  isLoading = false;
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
    this.isLoading = true;
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
            this.isLoading = false;
            console.log(verifyPinResponse);
            const newPinModel :NewPinModel = {
              entered_pin: currentPin,
              new_pin:Number(newPin)
            }
            if (verifyPinResponse) {
                this.newMudraPin.emit(newPinModel!);
            }else {
              this.messageService.add({
                severity: 'error',
                summary: 'Invalid Pin!',
                detail: 'Invalid pin entered! ',
              });
              this.changePinForm.reset();
            }
          },
          error:(err:any)=> {
            this.isLoading=false;
          }
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
      this.isLoading=false;
      this.messageService.add({
        severity: 'info',
        summary: 'No values entered',
        detail: 'No values for the pin entered! ',
      });
    }else {
      this.isLoading=false;
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

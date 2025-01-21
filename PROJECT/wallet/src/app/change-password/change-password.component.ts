import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { MessageService } from 'primeng/api';
import { validatePassword } from '../validators/payment-validation';
import { VerifyPasswordModel } from '../modals/user-credentials-modals';

@Component({
    selector: 'app-change-password',
    imports: [ReactiveFormsModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private userService:UserService,private messageService:MessageService){}
  cancel = output();
  newPassword = output<string>();
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', {
      validators: [Validators.required,validatePassword],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required,validatePassword],
    }),
    confirmNewPassword: new FormControl('', {
      validators: [Validators.required,validatePassword],
    }),
  });
  onSubmit() {
    if (this.changePasswordForm.valid) {
      const currentPassword = this.changePasswordForm.value.currentPassword!;
      const newPassword = this.changePasswordForm.value.newPassword;
      const confirmNewPassword = this.changePasswordForm.value.confirmNewPassword;
      if(newPassword===confirmNewPassword){
        this.userService.verifyPassword(currentPassword).subscribe({
          next: (verifyPasswordResponse: VerifyPasswordModel) => {
            if (verifyPasswordResponse) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Password changed',
                  detail: 'Your Password has been changed successfully',
                });
                this.newPassword.emit(newPassword!);
            }else {
              this.messageService.add({
                severity: 'error',
                summary: 'Invalid Password',
                detail: 'Invalid Password entered! ',
              });
            }
          },
        });
      }
      else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Passwords Do not Match!',
          detail: 'New password and confirm password do not match! ',
        });
      }
      
    }else if(this.changePasswordForm.pristine){
      this.messageService.add({
        severity: 'info',
        summary: 'No values entered',
        detail: 'No values for the password entered! ',
      });
    }else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Password',
        detail: 'Please enter passwords in correct format! ',
      });
    }
  }
  onCancel() {
    this.messageService.add({
      severity: 'info',
      summary: 'Cancelled',
      detail: 'Password change cancelled',
    });
    this.cancel.emit();
  }
}

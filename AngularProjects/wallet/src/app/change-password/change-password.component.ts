import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private userService:UserService){}
  cancel = output();
  newPassword = output<string>();
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmNewPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    console.log('submitting the data')
    const currentPassword = this.changePasswordForm.value.currentPassword
    const newPassword = this.changePasswordForm.value.newPassword
    const confirmNewPassword = this.changePasswordForm.value.confirmNewPassword
    console.log(currentPassword,newPassword,confirmNewPassword, ' is the psssss')
    this.userService.verifyPassword(currentPassword!).subscribe(
      {
        next:(resData:any) => {
          console.log(resData)
          if(resData){
            if(newPassword===confirmNewPassword){
              console.log('emitted new password')
              this.newPassword.emit(newPassword!)
            }
            else {
              this.cancel.emit()
            }
          }
        }
      }
    )

  }
  onCancel() {
    this.cancel.emit();
  }
}

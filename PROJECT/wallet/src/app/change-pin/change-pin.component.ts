import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-change-pin',
    imports: [ReactiveFormsModule],
    templateUrl: './change-pin.component.html',
    styleUrl: './change-pin.component.css'
})
export class ChangePinComponent {
  constructor(private userService:UserService){}
    cancel = output();
    newMudraPin = output<number>();
    changePinForm = new FormGroup({
      currentPin: new FormControl('', {
        validators: [Validators.required],
      }),
      newPin: new FormControl('', {
        validators: [Validators.required],
      }),
      confirmNewPin: new FormControl('', {
        validators: [Validators.required],
      }),
    });
    onSubmit() {
      console.log('submitting the data')
      const currentPin = parseInt(this.changePinForm.value.currentPin!)
      const newPin = this.changePinForm.value.newPin
      const confirmNewPin = this.changePinForm.value.confirmNewPin
      console.log(currentPin,newPin,confirmNewPin, ' is the psssss')
      this.userService.verifyMudraPin(currentPin).subscribe(
        {
          next:(resData:any) => {
            console.log(resData)
            if(resData){
              if(newPin===confirmNewPin){
                console.log('emitted new pin')  

                this.newMudraPin.emit(parseInt(newPin!))
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

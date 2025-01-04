import { AbstractControl } from '@angular/forms';

export function validateUsernameFormat(control: AbstractControl) {
  const pattern = /^(?=.*[0-9])(?=.*[a-z])(?!.* ).{5,}$/;
  if (control.value && !pattern.test(control.value)) {
    return { invalidUsername: true };
  }
  return null;
}
export function validateMudraPinFormat(control: AbstractControl) {
  const mudraPinPattern = /^\d{6}$/;
  if (control.value && !mudraPinPattern.test(control.value)) {
    return { invalidMudraPin: true };
  }
  return null;
}
export function validateOTP(control: AbstractControl) {
  const otpPattern = /^\d{6}$/;
  if (control.value && !otpPattern.test(control.value)) {
    return { invalidOtp: true };
  }
  return null;
}
export function validatePassword(control: AbstractControl) {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{5,}$/;
  if (control.value && !passwordPattern.test(control.value)) {
    return { invalidPassword: true };
  }
  return null;
}
export function validateAmount(control: AbstractControl) {
  const amountPattern = /^[1-9]\d*$/; 
  if (!amountPattern.test(control.value)) {
    return { invalidAmount: true };
  }
  return null;
}
export function validatePinDigit(control: AbstractControl) {
  const pinPattern = /^\d{1}$/; 
  if (!pinPattern.test(control.value)) {
    return { invalidAmount: true };
  }
  return null;
}
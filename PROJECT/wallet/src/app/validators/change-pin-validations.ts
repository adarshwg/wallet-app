import { AbstractControl } from "@angular/forms";

export function validateMudraPinFormat(control: AbstractControl) {
  const mudraPinPattern = /^\d{6}$/;
  if (control.value && !mudraPinPattern.test(control.value)) {
    return { invalidMudraPin: true };
  }
  return null;
}
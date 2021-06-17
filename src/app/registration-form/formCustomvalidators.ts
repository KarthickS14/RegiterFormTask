import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormCustomValidators{
    static passWordValidator(){
        return (control: AbstractControl):any =>{
          if(!control.value){
            return null;
          }
          const passRegx: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm;
          const passRegx1: RegExp = /\s/gm;
          const passRegx2: RegExp = /\s?[, ]\s?/gm;
          const valid = passRegx.test(control.value) && !passRegx1.test(control.value) 
          && !passRegx2.test(control.value)&& !control.value.includes("'") && !control.value.includes('"') && !control.value.includes("&"); 
    
          return valid ? null : { passWordValidator: true };
        };
      }
      static confirmPasswordvalidators: any = (control: FormGroup)
      : ValidationErrors | null =>{
        const pass = control.get('password');
        const confirm = control.get('conpassword');
         return pass && confirm && pass.value !== confirm.value ? { notMatch: true } : null;
      }
}
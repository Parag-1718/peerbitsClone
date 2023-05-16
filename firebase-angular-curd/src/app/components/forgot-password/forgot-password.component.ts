import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  constructor(
    private authService: AuthService, private router: Router
  ){
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

  onsubmit(data:any){
    if(this.forgotPasswordForm.valid){
      // console.log("forgotPassWordForm: ",data.value);
      this.authService.forgotPassword(data.value);
    }else{
      this.forgotPasswordForm.markAllAsTouched(); 
    }
  }
}

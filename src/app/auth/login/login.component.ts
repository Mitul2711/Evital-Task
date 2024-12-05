import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { FireStoreService } from 'src/app/Services/fire-store.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  authService = inject(FireStoreService)


  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.authService.signIn(this.loginForm.value).subscribe(res => {
      // this.route.navigate(['/dashboard'])
    console.log('signin');
    
    }
    )
    
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}

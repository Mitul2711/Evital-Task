import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm: FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      userName: [''],
      email: [''],
      password: ['']
    })
  }

  onSubmit() {
    console.log(this.signupForm.value);
    
  }

  Login() {
this.router.navigate(['']);
  }

}

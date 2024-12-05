import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireStoreService } from 'src/app/Services/fire-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm: FormGroup
  authService = inject(FireStoreService)
  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      userName: [''],
      email: [''],
      password: ['']
    })
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.authService.signUp(this.signupForm.value).subscribe(res => {
      this.router.navigate(['/'])
    }
    )
  }

  Login() {
this.router.navigate(['']);
  }

}

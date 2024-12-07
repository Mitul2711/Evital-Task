import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FireStoreService } from 'src/app/Services/fire-store.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm: FormGroup
  authService = inject(FireStoreService)
  constructor(private fb: FormBuilder, private router: Router, private toast: ToastrService,) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.value).subscribe(res => {
      this.router.navigate(['/login'])
      this.toast.success("User Register Successfully!")
    }
    )
  }

  Login() {
this.router.navigate(['']);
  }

}

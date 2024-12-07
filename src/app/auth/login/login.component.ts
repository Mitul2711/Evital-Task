import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  authService = inject(FireStoreService);
  medicineId: any[] = [];


  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toast: ToastrService,
    private dataShareService: DataShareService,
    private fireStoreService: FireStoreService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.signIn(this.loginForm.value).subscribe(async res => {
      this.router.navigate(['/home']);
    this.toast.success("Login Successfully!")
      const medicineIds = await this.fireStoreService.getMedicinesIds();
      medicineIds.forEach(element => {
        this.medicineId.push(element);
      });
      localStorage.setItem("medicineId", JSON.stringify(this.medicineId));
      localStorage.setItem("userId", res.user.uid);
      this.dataShareService.sendOrderCount(true);
    }
    )

  }

  signup() {
    this.router.navigate(['/signup']);
  }

}

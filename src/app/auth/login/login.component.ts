import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authService = inject(FireStoreService);
  medicineId: any[] = [];

  type: string = "password"
  isText: boolean = false;
  visibility: Boolean = true;



  constructor(private fb: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private dataShareService: DataShareService,
    private fireStoreService: FireStoreService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.visibility = false;
  }

  onSubmit() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: async (res) => {
    
        this.router.navigate(['/home']);
        this.toast.success("Login Successfully!");
    
        const medicineIds = await this.fireStoreService.getMedicinesIds();
        medicineIds.forEach(element => {
          this.medicineId.push(element);
        });
    
        localStorage.setItem("medicineId", JSON.stringify(this.medicineId));
        localStorage.setItem("userId", res.user.uid);
        localStorage.setItem("login", "true");
        this.dataShareService.sendOrderCount(true);
      },
      error: (err) => {
        this.toast.error("Wrong Credentials"); // Display error message
      }
    });
    

  }

  hideShowPass() {
    this.visibility = !this.visibility;
  }


  toggleEyeIconVisibility() {
    this.visibility = true;
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}

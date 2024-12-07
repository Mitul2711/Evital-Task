import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router, 
    private fireService: FireStoreService, 
    private toast: ToastrService,
    private dataShareService: DataShareService) {}

  badge: any;
  ngOnInit(): void {
    // this.badge = JSON.parse(localStorage.getItem("medicineId")).length;
    this.dataShareService.orderCount$.subscribe((res: any) => {
      this.badge = JSON.parse(localStorage.getItem("medicineId")).length;
    })
  }

  logOut() {
    this.fireService.logOut();
    this.toast.success("Logout Successfully!")
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  onSearch(event: any) {
    const inputValue = (event.target as HTMLInputElement).value;
    if(inputValue) {
      this.dataShareService.sendMedicineName(inputValue);
      this.router.navigate(['/medicine']);
    } else {
     this.router.navigate(['/']); 
    }
  }

  onCart() {
    this.router.navigate(['/cart']);
  }

  onPatient() {
    this.router.navigate(['/patient']);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { DataShareService } from 'src/app/Services/data-share.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { MedicineInfoComponent } from '../medicine-info/medicine-info.component';
import { MatDialog } from '@angular/material/dialog';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.scss']
})
export class ViewMedicineComponent implements OnInit {

  medicines: any[] = [];
  medId: any[] = [];
  available: boolean = true;
  readonly dialog = inject(MatDialog);

  constructor(private medicineService: MedicineService,
    private dataShareService: DataShareService,
    private toast: ToastrService,
    private fireStoreService: FireStoreService) { }

  ngOnInit(): void {

    this.medId = localStorage.getItem("medicineId") ? JSON.parse(localStorage.getItem("medicineId")) : [];    

    // this.dataShareService.medicineName$.subscribe(medicine => {
      let medicine = localStorage.getItem("input");
      this.medicines = [];
      this.medicineService.searchMedicine(medicine).subscribe((res: any) => {
        this.medicines = res.data.result;
        const medicineObservables = this.medicines.map((ele: any) => {
          return this.medicineService.getMedicine(JSON.stringify([ele.medicine_id])).pipe(
            map((res: any) => {
              return {
                ...ele,
                available: res.data.length > 0,
              };
            })
          );
        });
        
        forkJoin(medicineObservables).subscribe((updatedMedicines: any[]) => {
          this.medicines = updatedMedicines;
        });
        
        
      })
    // })
    
   

  }
  cart: any[] = [];
  addToCart(data: any) {
    let id = [];
    id.push(data.medicine_id);
    this.medicineService.getMedicine(JSON.stringify(id)).subscribe((res: any) => {

      if(res.data.length == 0) {
        this.toast.info("Medicine Is Not Available");
      } else {
        if (this.medId.length > 0) {
          if (!this.medId.includes(data.medicine_id)) {
            this.medId.push(data.medicine_id);
            this.toast.success("Medicine Added To Cart")
            localStorage.setItem("medicineId", JSON.stringify(this.medId));
            this.cart.push({id: data.medicine_id, quantity: 1});
            localStorage.setItem("quantity", JSON.stringify(this.cart));
            this.fireStoreService.addMedicineCart(data.medicine_id);
            this.dataShareService.sendOrderCount(this.medId);
          } else {
            this.toast.info("Medicine Already In Cart")
            console.log(`Medicine ID ${data.medicine_id} is already in the cart.`);
            
          }
        } else {
          this.medId.push(data.medicine_id);
          localStorage.setItem("medicineId", JSON.stringify(this.medId));
          this.cart.push({id: data.medicine_id, quantity: 1});
          localStorage.setItem("quantity", JSON.stringify(this.cart));
            this.fireStoreService.addMedicineCart(data.medicine_id);
            this.dataShareService.sendOrderCount(this.medId);
        }
      }

    })    
   

  }

  onInfo(data: any) {
    console.log(data);
    if(data.available) {
      this.dialog.open(MedicineInfoComponent);
      this.dataShareService.sendmedicineId(data.medicine_id);
    } else {
      this.toast.info("Data Not Available")
    }
  }

}

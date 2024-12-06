import { Component, inject, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { DataShareService } from 'src/app/Services/data-share.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { MedicineInfoComponent } from '../medicine-info/medicine-info.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-medicine',
  templateUrl: './view-medicine.component.html',
  styleUrls: ['./view-medicine.component.scss']
})
export class ViewMedicineComponent implements OnInit {

  medicines: any[] = [];
  medId: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor( private medicineService: MedicineService, private dataShareService: DataShareService) {}

  ngOnInit(): void {

    this.medId =  JSON.parse(localStorage.getItem("medicineId"));


    this.dataShareService.medicineName$.subscribe(medicine => {
      this.medicines = [];
      this.medicineService.searchMedicine(medicine).subscribe((res: any) => {
        this.medicines = res.data.result;
      })
    })
  }

  addToCart(data: any) {
    
    if (!this.medId.includes(data.medicine_id)) {
      this.medId.push(data.medicine_id);
      localStorage.setItem("medicineId", JSON.stringify(this.medId));
      this.dataShareService.sendOrderCount(this.medId);
    } else {
      console.log(`Medicine ID ${data.medicine_id} is already in the cart.`);
    }
  }

  onInfo(data: any) {
    this.dialog.open(MedicineInfoComponent);
    this.dataShareService.sendmedicineId(data.medicine_id);
  }

}

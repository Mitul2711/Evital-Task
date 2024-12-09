import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  medId: any[] = [];
  medData: any[] = [];
  grandTotal: number = 0;

  constructor(
    private medicineService: MedicineService,
    private toast: ToastrService,
    private dataShareService: DataShareService,
    private router: Router,
    private fireStoreService: FireStoreService) { }

  async ngOnInit() {
    let ids = await this.fireStoreService.getMedicinesIds();

    ids.forEach(element => {
      this.medId = [];
      this.medId.push(element);
      this.medicineService.getMedicine(JSON.stringify(this.medId)).subscribe((res: any) => {
        if (res.data.length > 0) {
          const medicineWithQuantity = {
            ...res.data[0],
            quantity: 1
          };
          this.medData.push(medicineWithQuantity);
        }
      });
    });

    this.calculateTotal();
  }


  increaseQuantity(item: any) {
    console.log(item);
    
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(data: any) {
    this.fireStoreService.deleteMedicineId(data.id);
    this.medData = this.medData.filter(d => d.id !== data.id);
    const storedIds = JSON.parse(localStorage.getItem('medicineId') || '[]');
    const updatedIds = storedIds.filter((id: string) => id !== data.id);
    localStorage.setItem('medicineId', JSON.stringify(updatedIds));
    this.dataShareService.sendOrderCount(true);
  }

  calculateTotal() {
    this.grandTotal = 0;
    this.medData.forEach((item: any) => {
      item.subtotal = parseFloat((item.mrp * item.quantity).toFixed(2));
      this.grandTotal += item.subtotal;
    });

    this.grandTotal = parseFloat(this.grandTotal.toFixed(2));
    localStorage.setItem("total", JSON.stringify(this.grandTotal));
    return this.grandTotal
  }

  proceedToCheckout() {
    let id = [];

    this.medData.forEach(ele => {
      let item = {
        quantity: ele.quantity,
        medicine_id: ele.id
      }
      id.push(item);
    });

    let data = {
      latitude: 12.970612,
      longitude: 77.6382433,
      distance: 5,
      items: JSON.stringify(id)
    }

    this.medicineService.checkOut(data).subscribe((res: any) => {
      localStorage.setItem("shipping", res.data.shipping_charges);
      localStorage.setItem("medData", JSON.stringify(this.medData));
      this.router.navigate(['/order']);
    })


  }
}

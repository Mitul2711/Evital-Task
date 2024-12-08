import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  private fireStoreService: FireStoreService) { }

  ngOnInit(): void {
    let ids = JSON.parse(localStorage.getItem("medicineId"));
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
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(data: any) {
    this.medData = this.medData.filter(d => d.id == data.id);
    this.fireStoreService.deleteMedicineId(data.id);
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
      console.log(res);
      
    })

  }
}

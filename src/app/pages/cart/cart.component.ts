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
  quantity = 1;

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
          this.medData.push(res.data[0]);
        }
      })
    });
  }


  increaseQuantity(item: any) {
    this.quantity++;
  }

  decreaseQuantity(item: any) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  removeItem(data: any) {
    this.medData = this.medData.filter(d => d.id == data.id);
    this.fireStoreService.deleteMedicineId(data.id);
  }


  proceedToCheckout() {
    alert('Checkout functionality coming soon!');
  }
}

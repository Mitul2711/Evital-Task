import { Component, OnInit } from '@angular/core';
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

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    let ids = JSON.parse(localStorage.getItem("medicineId"));
    console.log(ids);
    ids.forEach(element => {
      this.medId = [];
      this.medId.push(element);
      this.medicineService.getMedicine(JSON.stringify(this.medId)).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.medData.push(res.data[0]);
          console.log(this.medData);
          
        }
      })
    });
  }

  // cartItems = [
  //   { id: 1, name: 'Medicine A', price: 25.0, quantity: 1 },
  //   { id: 2, name: 'Medicine B', price: 15.0, quantity: 1 },
  // ];

  // Increase quantity
  increaseQuantity(item: any) {
    this.quantity++;
  }

  // Decrease quantity
  decreaseQuantity(item: any) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Remove item from cart
  removeItem(index: number) {
    // this.cartItems.splice(index, 1);
  }

  // Calculate total price
  // calculateTotal(): string {
  //   const total = this.cartItems.reduce((sum, item) => sum + item.price * this.quantity, 0);
  //   return total.toFixed(2);
  // }

  // Proceed to checkout
  proceedToCheckout() {
    // console.log('Proceeding to checkout with items:', this.cartItems);
    alert('Checkout functionality coming soon!');
  }
}

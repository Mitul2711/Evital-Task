import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewMedicineComponent } from './view-medicine/view-medicine.component';
import { CartComponent } from './cart/cart.component';
import { PatientComponent } from './patient/patient.component';
import { PlaceOrderComponent } from './place-order/place-order.component';



const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "medicine", component: ViewMedicineComponent },
    { path: "cart", component: CartComponent },
    { path: "patient", component: PatientComponent },
    { path: "order", component: PlaceOrderComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })


export class PageRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { ViewMedicineComponent } from './view-medicine/view-medicine.component';
import { MedicineInfoComponent } from './medicine-info/medicine-info.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    HomeComponent,
    ViewMedicineComponent,
    MedicineInfoComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ],
  
})
export class PagesModule { }

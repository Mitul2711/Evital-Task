import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PageRoutingModule } from './page-routing.module';
import { ViewMedicineComponent } from './view-medicine/view-medicine.component';
import { MedicineInfoComponent } from './medicine-info/medicine-info.component';
import { CartComponent } from './cart/cart.component';
import { PatientComponent } from './patient/patient.component';
import { MaterialModule } from '../modules/material.module';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    ViewMedicineComponent,
    MedicineInfoComponent,
    CartComponent,
    PatientComponent,
    AddPatientComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PageRoutingModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }

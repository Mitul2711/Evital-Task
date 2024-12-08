import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  billForm: FormGroup;
  readonly dialog = inject(MatDialog);


  checkout: any;
  shippingCharges: number = 0;
  subtotal: number = 0;
  item: any[] = [];
  totalamoutobject: any;
  patientName: any[] = [];

  constructor(private fb: FormBuilder,
    private fireStoreService: FireStoreService,
    private router: Router,
    private dataShareService: DataShareService,
    private medicineService: MedicineService) {
    this.billForm = this.fb.group({
      patient_name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      delivery_type: ['', Validators.required],
      chemistId: [''],
      auto_assign: ['', Validators.required],
      latitude: ['12.970612'],
      longitude: ['77.6382433']
    })
  }

  async ngOnInit() {
    this.subtotal = parseInt(localStorage.getItem("total"));
    this.shippingCharges = parseInt(localStorage.getItem("shipping"));
    this.patientName = [];
    let ids = await this.fireStoreService.getPatientIds();
    ids.forEach(element => {
      this.medicineService.getPatient(element).subscribe((res: any) => {
        this.patientName.push(res.data[0].firstname);
      })
    });

    let medData = [];
    medData = JSON.parse(localStorage.getItem("medData"));
      medData.forEach(ele => {
        this.item.push({medicine_id: ele.id, quantity: ele.quantity});
      })

  }

  placeOrder() {
    const formData = {
      items: JSON.stringify(this.item),
      delivery_type: this.billForm.get('delivery_type')?.value || "delivery",
      patient_name: this.billForm.get('patient_name')?.value,
      mobile: this.billForm.get('mobile')?.value,
      address: this.billForm.get('address')?.value,
      city: this.billForm.get('city')?.value,
      state: this.billForm.get('state')?.value,
      zipcode: this.billForm.get('zipcode')?.value,
      auto_assign: this.billForm.get('auto_assign')?.value || true,
      chemist_id: this.billForm.get('chemistId')?.value || null,
      latitude: +this.billForm.get('latitude')?.value || 12.970612,
      longitude: +this.billForm.get('longitude')?.value || 77.6382433,
    };
    
    this.medicineService.placeOrder(formData).subscribe((res: any) => {
      this.dataShareService.sendOrderPlaced(res);
      this.dialog.open(OrderPlacedComponent)
    })
  }

  returntohome() { 
    this.router.navigate(['/home']);
  }

}

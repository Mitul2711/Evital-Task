import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from 'src/app/Services/data-share.service';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent {

  patientForm: FormGroup;
  maxDate: Date;

  constructor(private fb: FormBuilder, 
    private medicineService: MedicineService,
    private dataShareService: DataShareService, 
    private fireStoreService: FireStoreService) {
    this.patientForm = this.fb.group({
      mobile: ['', [Validators.required,  Validators.pattern(/^[0-9]{10}$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.maxDate = new Date(); 

  }

  onSubmit() {
    this.medicineService.addpatient(this.patientForm.value).subscribe((res: any) => {
      this.fireStoreService.addPatient(res.data.patient_id);
      this.dataShareService.sendgridData(true);
    })
  }

}

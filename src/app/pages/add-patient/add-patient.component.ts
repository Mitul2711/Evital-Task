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

  patientForm: FormGroup

  constructor(private fb: FormBuilder, 
    private medicineService: MedicineService,
    private dataShareService: DataShareService, 
    private fireStoreService: FireStoreService) {
    this.patientForm = this.fb.group({
      mobile: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      zipcode: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['', Validators.required],
    })
  }

  onSubmit() {
    this.medicineService.addpatient(this.patientForm.value).subscribe((res: any) => {
      this.fireStoreService.addPatient(res.data.patient_id);
      this.dataShareService.sendgridData(true);
    })
  }

}

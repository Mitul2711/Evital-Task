import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { FireStoreService } from 'src/app/Services/fire-store.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import { DataShareService } from 'src/app/Services/data-share.service';

const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})


export class PatientComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['firstname', 'lastname', 'zipcode', 'mobile'];

  patientData: any[] = [];

  constructor(private fireStoreService: FireStoreService,
    private dataShareService: DataShareService,
    private medicineService: MedicineService,
    private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    this.dataShareService.gridData$.subscribe(async res => {
      let ids = await this.fireStoreService.getPatientIds();
      ids.forEach(element => {
        this.medicineService.getPatient(element).subscribe((res: any) => {
          this.patientData.push(res.data[0]);
          this.cdr.detectChanges();
          this.refreshGrid();
        })
      });
      this.dialog.closeAll();
    })
  }

  addData() {
    this.dialog.open(AddPatientComponent);
  }

  refreshGrid() {
    console.log("refresh");
    
    this.patientData = [...this.patientData];
  }

}


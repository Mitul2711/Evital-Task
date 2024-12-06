import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/Services/data-share.service';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-medicine-info',
  templateUrl: './medicine-info.component.html',
  styleUrls: ['./medicine-info.component.scss']
})
export class MedicineInfoComponent implements OnInit {

  mediId: any[] = [];
  medData: any;

  constructor(private dataShareService: DataShareService, private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.dataShareService.medicineId$.subscribe((res: any) => {
      this.mediId = [];
      this.mediId.push(res);
        this.medicineService.getMedicine(JSON.stringify(this.mediId)).subscribe((data: any) => {
          this.medData = data.data[0];
          console.log("data",this.medData);
        })      
    })
  }

}

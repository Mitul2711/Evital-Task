import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { lastValueFrom } from 'rxjs';
import { DataShareService } from 'src/app/Services/data-share.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mediName: any[] = [["OUiyMRWOnwFdfeiLUZJd5Q=="], ["MZ83mm6x5XpK/ifflDcZcA=="],
    ["MZ83mm6x5XpK/ifflDcZcA=="], ["HfxsCvmDtBWZAifd3yffOA=="]
  ];

  browseMed = ["Dolo", "Beta", "Trichup", "paracetamol", "Thyrox", "zifi", "Mamy"]

  medicines: any[] = [];

  constructor(private medicineService: MedicineService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private dataShareService: DataShareService
  ) {

  }

  ngOnInit(): void {  
    this.getAllMedicine();
  }

  async getAllMedicine() {
    const promises = this.mediName.map(ele => 
      lastValueFrom(this.medicineService.getMedicine(JSON.stringify(ele)))  
    );
  
    const results = await Promise.all(promises);
  
    
    results.forEach((res: any) => {
      this.medicines.push(res.data[0]);
    });
    
  }


  onBrowseMed(data: any) {
    localStorage.setItem("input", data);
    this.router.navigate(['/medicine']);    
  }
  

}
